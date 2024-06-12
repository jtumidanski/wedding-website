// backend/main.go
package main

import (
	"context"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/logger"
	"jtumidanski.com/rsvp/party"
	"jtumidanski.com/rsvp/party/member"
	"jtumidanski.com/rsvp/party/member/response"
	"jtumidanski.com/rsvp/party/member/response/log"
	"jtumidanski.com/rsvp/rest"
	"jtumidanski.com/rsvp/tracing"
	"os/signal"
	"sync"
	"syscall"

	"io"
	"os"
)

const serviceName = "rsvp"

type Server struct {
	baseUrl string
	prefix  string
}

func (s Server) GetBaseURL() string {
	return s.baseUrl
}

func (s Server) GetPrefix() string {
	return s.prefix
}

func GetServer() Server {
	return Server{
		baseUrl: "",
		prefix:  "/api/rsvp",
	}
}

func main() {
	l := logger.CreateLogger(serviceName)
	l.Infoln("Starting main service.")

	wg := &sync.WaitGroup{}
	ctx, cancel := context.WithCancel(context.Background())

	tc, err := tracing.InitTracer(l)(serviceName)
	if err != nil {
		l.WithError(err).Fatal("Unable to initialize tracer.")
	}
	defer func(tc io.Closer) {
		err = tc.Close()
		if err != nil {
			l.WithError(err).Errorf("Unable to close tracer.")
		}
	}(tc)

	db := database.Connect(l, database.SetMigrations(party.Migration, response.Migration, member.Migration, log.Migration))

	rest.CreateService(l, ctx, wg, GetServer().GetPrefix(), party.InitResource(GetServer(), db), member.InitResource(GetServer(), db), response.InitResource(GetServer(), db))

	// trap sigterm or interrupt and gracefully shutdown the server
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, os.Kill, syscall.SIGTERM)

	// Block until a signal is received.
	sig := <-c
	l.Infof("Initiating shutdown with signal %s.", sig)
	cancel()
	wg.Wait()
	l.Infoln("Service shutdown.")
}
