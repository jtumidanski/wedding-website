package log

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func create(db *gorm.DB) func(memberId uuid.UUID, attending bool, entree string, allergies string, ipAddress string) error {
	return func(memberId uuid.UUID, attending bool, entree string, allergies string, ipAddress string) error {
		tx := db.Begin()
		defer func() {
			if r := recover(); r != nil {
				tx.Rollback()
			}
		}()
		if tx.Error != nil {
			return tx.Error
		}

		var e Entity
		e.MemberID = memberId
		e.Attending = attending
		e.Entree = entree
		e.Allergies = allergies
		e.IPAddress = ipAddress

		if err := tx.Save(&e).Error; err != nil {
			tx.Rollback()
			return err
		}

		err := tx.Commit().Error
		if err != nil {
			return err
		}

		return nil
	}
}
