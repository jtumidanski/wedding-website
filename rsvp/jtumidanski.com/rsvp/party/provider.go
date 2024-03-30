package party

import (
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/model"
)

func entityByHash(hash string) database.EntityProvider[Entity] {
	return func(db *gorm.DB) model.Provider[Entity] {
		var results Entity
		err := db.Where(&Entity{Hash: hash}).First(&results).Error
		if err != nil {
			return model.ErrorProvider[Entity](err)
		}
		return model.FixedProvider[Entity](results)
	}
}

func getAll() database.EntitySliceProvider[Entity] {
	return func(db *gorm.DB) model.SliceProvider[Entity] {
		var results []Entity
		err := db.Preload("Members").Preload("Members.Response").Find(&results).Error
		if err != nil {
			return model.ErrorSliceProvider[Entity](err)
		}
		return model.FixedSliceProvider(results)
	}
}
