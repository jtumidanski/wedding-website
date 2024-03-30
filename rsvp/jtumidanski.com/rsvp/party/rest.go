package party

import (
	"github.com/manyminds/api2go/jsonapi"
	"jtumidanski.com/rsvp/party/member"
)

type RestModel struct {
	ID      string             `json:"-"`
	Name    string             `json:"name"`
	Hash    string             `json:"hash"`
	Members []member.RestModel `json:"members"`
}

func (p RestModel) GetReferences() []jsonapi.Reference {
	return []jsonapi.Reference{
		{
			Name: "members",
			Type: "member",
		},
	}
}

func (p RestModel) GetName() string {
	return "parties"
}

func (p RestModel) GetReferencedIDs() []jsonapi.ReferenceID {
	var result []jsonapi.ReferenceID
	for _, m := range p.Members {
		result = append(result, jsonapi.ReferenceID{ID: m.GetID(), Name: "members", Type: "member"})
	}
	return result
}

func (p RestModel) GetReferencedStructs() []jsonapi.MarshalIdentifier {
	var result []jsonapi.MarshalIdentifier
	for key := range p.Members {
		result = append(result, p.Members[key])
	}

	return result
}

func (p RestModel) GetID() string {
	return p.ID
}

func TransformAll(models []Model) []RestModel {
	rms := make([]RestModel, 0)
	for _, m := range models {
		rms = append(rms, Transform(m))
	}
	return rms
}

func Transform(model Model) RestModel {
	rm := RestModel{
		ID:      model.ID,
		Name:    model.Name,
		Hash:    model.Hash,
		Members: make([]member.RestModel, 0),
	}
	for _, m := range model.Members {
		rm.Members = append(rm.Members, member.Transform(m))
	}
	return rm
}
