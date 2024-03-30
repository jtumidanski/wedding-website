package member

import (
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
)

func GetByPartyId(l logrus.FieldLogger, db *gorm.DB) func(partyId string) ([]Model, error) {
	return func(partyId string) ([]Model, error) {
		partyUUID, err := uuid.Parse(partyId)
		if err != nil {
			l.WithError(err).Errorf("Invalid party uuid provided.")
			return nil, err
		}
		return database.ModelSliceProvider[Model, Entity](db)(getByPartyId(partyUUID), MakeMember)()
	}
}
