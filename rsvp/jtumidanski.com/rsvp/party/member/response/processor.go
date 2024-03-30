package response

import (
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
)

func Get(l logrus.FieldLogger, db *gorm.DB) func(memberId string) (Model, error) {
	return func(memberId string) (Model, error) {
		memberUUID, err := uuid.Parse(memberId)
		if err != nil {
			l.WithError(err).Errorf("Invalid member uuid provided.")
			return Model{}, err
		}
		return database.ModelProvider[Model, Entity](db)(getByMemberId(memberUUID), MakeResponse)()
	}
}
