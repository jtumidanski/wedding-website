package member

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/model"
	"jtumidanski.com/rsvp/party/member/response"
)

func getByPartyId(partyId uuid.UUID) database.EntitySliceProvider[Entity] {
	return func(db *gorm.DB) model.SliceProvider[Entity] {
		return database.SliceQuery[Entity](db, &Entity{PartyID: partyId}, "Response")
	}
}

func MakeMember(e Entity) (Model, error) {
	r, err := response.MakeResponse(e.Response)
	if err != nil {
		return Model{}, err
	}

	return Model{
		ID:        e.ID.String(),
		FirstName: e.FirstName,
		LastName:  e.LastName,
		Response:  r,
	}, nil
}
