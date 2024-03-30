package member

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/model"
)

func getByPartyId(partyId uuid.UUID) database.EntitySliceProvider[Entity] {
	return func(db *gorm.DB) model.SliceProvider[Entity] {
		return database.SliceQuery[Entity](db, &Entity{PartyID: partyId})
	}
}

func MakeMember(e Entity) (Model, error) {
	return Model{
		ID:        e.ID.String(),
		FirstName: e.FirstName,
		LastName:  e.LastName,
	}, nil
}
