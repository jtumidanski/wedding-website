package party

import (
	"encoding/csv"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/manyminds/api2go/jsonapi"
	"github.com/opentracing/opentracing-go"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"hash/fnv"
	"io"
	"jtumidanski.com/rsvp/rest"
	"net/http"
	"os"
)

const (
	ProcessCSV    = "process_csv"
	GetAllParties = "get_all_parties"
)

func InitResource(si jsonapi.ServerInformation, db *gorm.DB) func(router *mux.Router, l logrus.FieldLogger) {
	return func(router *mux.Router, l logrus.FieldLogger) {
		router.HandleFunc("/process-csv", registerProcessCSV(si)(l)(db)).Methods(http.MethodPut)
		r := router.PathPrefix("/parties").Subrouter()
		r.HandleFunc("", registerGetAllPartiesBySearch(si)(l)(db)).Methods(http.MethodGet).Queries("search", "{search}")
		r.HandleFunc("", registerGetAllPartiesByHash(si)(l)(db)).Methods(http.MethodGet).Queries("hash", "{hash}")
		r.HandleFunc("", registerGetAllParties(si)(l)(db)).Methods(http.MethodGet)
	}
}

func registerGetAllParties(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetAllParties, handleGetAllParties(si)(l)(db))
		}
	}
}

func handleGetAllParties(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
	return func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
		return func(db *gorm.DB) rest.SpanHandler {
			return func(span opentracing.Span) http.HandlerFunc {
				return func(w http.ResponseWriter, r *http.Request) {
					parties, err := GetAll(l, db)
					if err != nil {
						l.WithError(err).Errorf("Unable to retrieve all parties for request.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}

					res, err := jsonapi.MarshalWithURLs(TransformAll(parties), si)
					if err != nil {
						l.WithError(err).Errorf("Unable to marshal models.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
					_, err = w.Write(res)
					if err != nil {
						l.WithError(err).Errorf("Unable to write response.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
				}
			}
		}
	}
}

func registerGetAllPartiesByHash(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetAllParties, handleGetAllPartiesByHash(si)(l)(db))
		}
	}
}

func handleGetAllPartiesByHash(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
	return func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
		return func(db *gorm.DB) rest.SpanHandler {
			return func(span opentracing.Span) http.HandlerFunc {
				return func(w http.ResponseWriter, r *http.Request) {
					hash, ok := mux.Vars(r)["hash"]
					if !ok {
						l.Errorf("Unable to properly parse hash from path.")
						w.WriteHeader(http.StatusBadRequest)
						return
					}

					parties, err := GetAllByHash(l, db)(hash)
					if err != nil {
						l.WithError(err).Errorf("Unable to retrieve all parties for request.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}

					res, err := jsonapi.MarshalWithURLs(TransformAll(parties), si)
					if err != nil {
						l.WithError(err).Errorf("Unable to marshal models.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
					_, err = w.Write(res)
					if err != nil {
						l.WithError(err).Errorf("Unable to write response.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
				}
			}
		}
	}
}

func registerProcessCSV(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(ProcessCSV, handleProcessCSV(si)(l)(db))
		}
	}
}

func handleProcessCSV(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
	return func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
		return func(db *gorm.DB) rest.SpanHandler {
			return func(span opentracing.Span) http.HandlerFunc {
				return func(w http.ResponseWriter, r *http.Request) {
					csvFilePath := os.Getenv("CSV_FILE_PATH")
					if csvFilePath == "" {
						http.Error(w, "CSV file path is not set", http.StatusInternalServerError)
						return
					}

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
							_, _ = Create(l, db)(partyName, hash, firstName, lastName)
						} else {
							_, _ = AddMember(l, db)(hash, firstName, lastName)
						}
						parties[hash] = 1
					}

					results, err := GetAll(l, db)
					if err != nil {
						l.WithError(err).Errorf("Unable to retrieve all parties for request.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}

					res, err := jsonapi.MarshalWithURLs(TransformAll(results), si)
					if err != nil {
						l.WithError(err).Errorf("Unable to marshal models.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
					_, err = w.Write(res)
					if err != nil {
						l.WithError(err).Errorf("Unable to write response.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
				}
			}
		}
	}
}

func registerGetAllPartiesBySearch(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetAllParties, handleGetAllPartiesBySearch(si)(l)(db))
		}
	}
}

func handleGetAllPartiesBySearch(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
	return func(l logrus.FieldLogger) func(db *gorm.DB) rest.SpanHandler {
		return func(db *gorm.DB) rest.SpanHandler {
			return func(span opentracing.Span) http.HandlerFunc {
				return func(w http.ResponseWriter, r *http.Request) {
					search, ok := mux.Vars(r)["search"]
					if !ok {
						l.Errorf("Unable to properly parse search from path.")
						w.WriteHeader(http.StatusBadRequest)
						return
					}

					parties, err := GetAllBySearch(l, db)(search)
					if err != nil {
						l.WithError(err).Errorf("Unable to retrieve all parties for request.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}

					res, err := jsonapi.MarshalWithURLs(TransformAll(parties), si)
					if err != nil {
						l.WithError(err).Errorf("Unable to marshal models.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
					_, err = w.Write(res)
					if err != nil {
						l.WithError(err).Errorf("Unable to write response.")
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
				}
			}
		}
	}
}

// fnv32 generates a 32-bit FNV-1a hash and returns the hash as a uint32
func fnv32(key string) uint32 {
	algorithm := fnv.New32a()
	algorithm.Write([]byte(key))
	return algorithm.Sum32()
}
