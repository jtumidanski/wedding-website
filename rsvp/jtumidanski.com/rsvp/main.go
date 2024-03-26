// backend/main.go
package main

import (
	"encoding/csv"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/logger"
	"jtumidanski.com/rsvp/party"

	"github.com/manyminds/api2go/jsonapi"
	"hash/fnv"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	l := logger.CreateLogger("rsvp")
	l.Infoln("Starting main service.")

	db := database.Connect(l, database.SetMigrations(party.Migration))

	r := mux.NewRouter()
	r.HandleFunc("/api/rsvp/process-csv", processCSVHandler(l, db)).Methods(http.MethodPut)

	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func processCSVHandler(l logrus.FieldLogger, db *gorm.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		csvFilePath := os.Getenv("CSV_FILE_PATH")
		if csvFilePath == "" {
			http.Error(w, "CSV file path is not set", http.StatusInternalServerError)
			return
		}

		processCSV(l, db)(csvFilePath, w)
	}
}

func processCSV(l logrus.FieldLogger, db *gorm.DB) func(csvFilePath string, w http.ResponseWriter) {
	return func(csvFilePath string, w http.ResponseWriter) {
		file, err := os.Open(csvFilePath)
		if err != nil {
			http.Error(w, "Error opening CSV file", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		reader := csv.NewReader(file)
		reader.Read() // Skip the header row

		parties := make(map[string]int)
		for {
			record, err := reader.Read()
			if err == io.EOF {
				break
			}
			if err != nil {
				l.WithError(err).Errorf("Error reading CSV record.")
				http.Error(w, "Error reading CSV record", http.StatusInternalServerError)
				return
			}

			firstName, lastName, partyName := record[0], record[1], record[2]
			hash := fmt.Sprintf("%x", fnv32(partyName))[:4]

			if _, ok := parties[hash]; !ok {
				_, _ = party.Create(l, db)(partyName, hash, firstName, lastName)
			} else {
				_, _ = party.AddMember(l, db)(hash, firstName, lastName)
			}
			parties[hash] = 1
		}

		ps, err := party.GetAll(l, db)
		if err != nil {
			l.WithError(err).Errorf("Unable to retrieve parties.")
			http.Error(w, "Unable to retrieve parties", http.StatusInternalServerError)
			return
		}

		r := make([]party.RestModel, 0)
		for _, p := range ps {
			rs := make([]party.RestMember, 0)
			for _, m := range p.Members {
				rs = append(rs, party.RestMember{
					FirstName: m.FirstName,
					LastName:  m.LastName,
				})
			}

			r = append(r, party.RestModel{
				ID:      p.ID,
				Name:    p.Name,
				Members: rs,
			})
		}

		jsonData, err := jsonapi.Marshal(r)
		if err != nil {
			http.Error(w, "Error marshalling JSON", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/vnd.api+json")
		w.Write(jsonData)
	}
}

// fnv32 generates a 32-bit FNV-1a hash and returns the hash as a uint32
func fnv32(key string) uint32 {
	algorithm := fnv.New32a()
	algorithm.Write([]byte(key))
	return algorithm.Sum32()
}
