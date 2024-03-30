package response

import "strings"

func MakeResponse(e Entity) (Model, error) {
	return Model{
		ID:        e.ID.String(),
		Attending: e.Attending,
		Entree:    e.Entree,
		Allergies: strings.Split(e.Allergies, ","),
	}, nil
}
