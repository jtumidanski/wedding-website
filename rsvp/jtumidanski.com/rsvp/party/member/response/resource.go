package response

import (
	"github.com/gorilla/mux"
	"github.com/manyminds/api2go/jsonapi"
	"github.com/opentracing/opentracing-go"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"io"
	"jtumidanski.com/rsvp/rest"
	"net/http"
	"strings"
)

const (
	GetResponse = "get_response"
)

func InitResource(si jsonapi.ServerInformation, db *gorm.DB) func(router *mux.Router, l logrus.FieldLogger) {
	return func(router *mux.Router, l logrus.FieldLogger) {
		r := router.PathPrefix("/members").Subrouter()
		r.HandleFunc("/{memberId}/response", registerGetResponse(si)(l)(db)).Methods(http.MethodGet)
		r.HandleFunc("/{memberId}/response", registerUpdateResponse(si)(l)(db)).Methods(http.MethodPatch)
	}
}

type MemberIdHandler func(memberId string) http.HandlerFunc

func ParseMemberId(l logrus.FieldLogger, next MemberIdHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		memberId, ok := mux.Vars(r)["memberId"]
		if !ok {
			l.Errorf("Unable to properly parse memberId from path.")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		next(memberId)(w, r)
	}
}

func registerGetResponse(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetResponse, func(span opentracing.Span) http.HandlerFunc {
				return ParseMemberId(l, func(memberId string) http.HandlerFunc {
					return handleGetResponse(si)(l)(db)(span)(memberId)
				})
			})
		}
	}
}

func handleGetResponse(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(memberId string) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(memberId string) http.HandlerFunc {
		return func(db *gorm.DB) func(span opentracing.Span) func(memberId string) http.HandlerFunc {
			return func(span opentracing.Span) func(memberId string) http.HandlerFunc {
				return func(memberId string) http.HandlerFunc {
					return func(w http.ResponseWriter, r *http.Request) {
						response, err := Get(l, db)(memberId)
						if err != nil {
							l.WithError(err).Errorf("Unable to response for member [%s].", memberId)
							w.WriteHeader(http.StatusInternalServerError)
							return
						}

						res, err := jsonapi.MarshalWithURLs(Transform(response), si)
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

type UpdateResponseInputHandler func(input RestModel) http.HandlerFunc

func ParseUpdateResponseInput(l logrus.FieldLogger, next UpdateResponseInputHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		i := &RestModel{}
		body, err := io.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = jsonapi.Unmarshal(body, i)
		if err != nil {
			l.WithError(err).Errorf("Deserializing input")
			w.WriteHeader(http.StatusBadRequest)
			if err != nil {
				l.WithError(err).Errorf("Unable to serialize error mesage")
			}
			return
		}
		next(*i)(w, r)
	}
}

func registerUpdateResponse(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) http.HandlerFunc {
		return func(db *gorm.DB) http.HandlerFunc {
			return rest.RetrieveSpan(GetResponse, func(span opentracing.Span) http.HandlerFunc {
				return ParseMemberId(l, func(memberId string) http.HandlerFunc {
					return ParseUpdateResponseInput(l, func(input RestModel) http.HandlerFunc {
						return handleUpdateResponse(si)(l)(db)(span)(memberId)(input)
					})
				})
			})
		}
	}
}

func handleUpdateResponse(si jsonapi.ServerInformation) func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(memberId string) func(input RestModel) http.HandlerFunc {
	return func(l logrus.FieldLogger) func(db *gorm.DB) func(span opentracing.Span) func(memberId string) func(input RestModel) http.HandlerFunc {
		return func(db *gorm.DB) func(span opentracing.Span) func(memberId string) func(input RestModel) http.HandlerFunc {
			return func(span opentracing.Span) func(memberId string) func(input RestModel) http.HandlerFunc {
				return func(memberId string) func(input RestModel) http.HandlerFunc {
					return func(input RestModel) http.HandlerFunc {
						return func(w http.ResponseWriter, r *http.Request) {
							response, err := Update(l, db)(memberId, input.Attending, input.Entree, strings.Join(input.Allergies, ","), input.IpAddress)
							if err != nil {
								l.WithError(err).Errorf("Unable to response for member [%s].", memberId)
								w.WriteHeader(http.StatusInternalServerError)
								return
							}

							res, err := jsonapi.MarshalWithURLs(Transform(response), si)
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
}
