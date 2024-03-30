package response

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func update(db *gorm.DB) func(memberId uuid.UUID, attending bool, entree string, allergies string) (Model, error) {
	return func(memberId uuid.UUID, attending bool, entree string, allergies string) (Model, error) {
		tx := db.Begin()
		defer func() {
			if r := recover(); r != nil {
				tx.Rollback()
			}
		}()
		if tx.Error != nil {
			return Model{}, tx.Error
		}

		e, err := getByMemberId(memberId)(tx)()
		if err != nil {
			tx.Rollback()
			return Model{}, err
		}

		e.Attending = attending
		e.Entree = entree
		e.Allergies = allergies

		if err = tx.Save(&e).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		err = tx.Commit().Error
		if err != nil {
			return Model{}, err
		}

		return MakeResponse(e)
	}
}
