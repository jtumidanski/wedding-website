package member

import (
	"github.com/manyminds/api2go/jsonapi"
	"jtumidanski.com/rsvp/party/member/response"
)

type RestModel struct {
	ID        string             `json:"id"`
	FirstName string             `json:"first-name"`
	LastName  string             `json:"last-name"`
	Response  response.RestModel `json:"response"`
}

func (p RestModel) GetReferences() []jsonapi.Reference {
	return []jsonapi.Reference{
		{
			Name: "response",
			Type: "response",
		},
	}
}

func (p RestModel) GetID() string {
	return p.ID
}

func (p RestModel) GetName() string {
	return "members"
}

func (p RestModel) GetReferencedIDs() []jsonapi.ReferenceID {
	var result []jsonapi.ReferenceID
	result = append(result, jsonapi.ReferenceID{ID: p.Response.GetID(), Name: "response", Type: "response"})
	return result
}

func (p RestModel) GetReferencedStructs() []jsonapi.MarshalIdentifier {
	var result []jsonapi.MarshalIdentifier
	result = append(result, p.Response)
	return result
}

func Transform(model Model) RestModel {
	return RestModel{
		ID:        model.ID,
		FirstName: model.FirstName,
		LastName:  model.LastName,
		Response:  response.Transform(model.Response),
	}
}

func TransformAll(models []Model) []RestModel {
	rms := make([]RestModel, 0)
	for _, m := range models {
		rms = append(rms, Transform(m))
	}
	return rms
}
