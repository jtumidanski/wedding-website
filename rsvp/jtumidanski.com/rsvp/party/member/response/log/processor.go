package log

import (
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func Create(l logrus.FieldLogger, db *gorm.DB) func(memberId string, attending bool, entree string, allergies string, ipAddress string) error {
	return func(memberId string, attending bool, entree string, allergies string, ipAddress string) error {
		memberUUID, err := uuid.Parse(memberId)
		if err != nil {
			l.WithError(err).Errorf("Invalid member uuid provided.")
			return err
		}
		return create(db)(memberUUID, attending, entree, allergies, ipAddress)
	}
}
