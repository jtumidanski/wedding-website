package party

import (
	"fmt"
	"github.com/manyminds/api2go/jsonapi"
)

type RestModel struct {
	ID      string       `json:"-"`
	Name    string       `json:"name"`
	Members []RestMember `json:"members"`
}

func (p RestModel) GetReferences() []jsonapi.Reference {
	return []jsonapi.Reference{
		{
			Name: "members",
			Type: "members",
		},
	}
}

func (p RestModel) GetReferencedIDs() []jsonapi.ReferenceID {
	var result []jsonapi.ReferenceID
	for _, m := range p.Members {
		result = append(result, jsonapi.ReferenceID{ID: m.GetID(), Name: "members", Type: "members"})
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

type RestMember struct {
	FirstName string `json:"first-name"`
	LastName  string `json:"last-name"`
}

func (p RestMember) GetID() string {
	return fmt.Sprintf("%s-%s", p.FirstName, p.LastName)
}
