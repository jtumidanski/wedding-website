package member

import (
	"github.com/gorilla/mux"
	"github.com/manyminds/api2go/jsonapi"
	"github.com/opentracing/opentracing-go"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/rest"
	"net/http"
)

const (
	GetMembers = "get_members"
)

func InitResource(si jsonapi.ServerInformation, db *gorm.DB) func(router *mux.Router, l logrus.FieldLogger) {
	return func(router *mux.Router, l logrus.FieldLogger) {
		r := router.PathPrefix("/parties").Subrouter()
		r.HandleFunc("/{partyId}/members", registerGetMembers(si)(l)(db)).Methods(http.MethodGet)
	}
}

type IdHandler func(partyId string) http.HandlerFunc

func ParseId(l logrus.FieldLogger, next IdHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		partyId, ok := mux.Vars(r)["partyId"]
		if !ok {
			l.Errorf("Unable to properly parse partyId from path.")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		next(partyId)(w, r)
	}
}

func registerGetMembers(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetMembers, func(span opentracing.Span) http.HandlerFunc {
				return ParseId(l, func(partyId string) http.HandlerFunc {
					return handleGetMembers(si)(l)(db)(span)(partyId)
				})
			})
		}
	}
}

func handleGetMembers(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(partyId string) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(partyId string) http.HandlerFunc {
		return func(db *gorm.DB) func(span opentracing.Span) func(partyId string) http.HandlerFunc {
			return func(span opentracing.Span) func(partyId string) http.HandlerFunc {
				return func(partyId string) http.HandlerFunc {
					return func(w http.ResponseWriter, r *http.Request) {
						members, err := GetByPartyId(l, db)(partyId)
						if err != nil {
							l.WithError(err).Errorf("Unable to get members for party [%s]", partyId)
							w.WriteHeader(http.StatusInternalServerError)
							return
						}

						res, err := jsonapi.MarshalWithURLs(TransformAll(members), si)
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
}
