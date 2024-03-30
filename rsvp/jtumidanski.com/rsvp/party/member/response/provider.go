package response

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/model"
	"strings"
)

func getByMemberId(memberId uuid.UUID) database.EntityProvider[Entity] {
	return func(db *gorm.DB) model.Provider[Entity] {
		return database.Query[Entity](db, &Entity{MemberID: memberId})
	}
}

func MakeResponse(e Entity) (Model, error) {
	return Model{
		ID:        e.ID.String(),
		Attending: e.Attending,
		Entree:    e.Entree,
		Allergies: strings.Split(e.Allergies, ","),
	}, nil
}
