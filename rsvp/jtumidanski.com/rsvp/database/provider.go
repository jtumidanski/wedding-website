package database

import (
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/model"
)

type EntityProvider[E any] func(db *gorm.DB) model.Provider[E]

type EntitySliceProvider[E any] func(db *gorm.DB) model.SliceProvider[E]

func ModelProvider[M any, E any](db *gorm.DB) func(ep EntityProvider[E], t model.Transformer[E, M]) model.Provider[M] {
	return func(ep EntityProvider[E], t model.Transformer[E, M]) model.Provider[M] {
		return model.Map[E, M](ep(db), t)
	}
}

func ModelSliceProvider[M any, E any](db *gorm.DB) func(ep EntitySliceProvider[E], t model.Transformer[E, M]) model.SliceProvider[M] {
	return func(ep EntitySliceProvider[E], t model.Transformer[E, M]) model.SliceProvider[M] {
		return model.SliceMap(ep(db), t)
	}
}

func Query[E any](db *gorm.DB, query interface{}) model.Provider[E] {
	var result E
	err := db.Where(query).First(&result).Error
	if err != nil {
		return model.ErrorProvider[E](err)
	}
	return model.FixedProvider[E](result)
}

func SliceQuery[E any](db *gorm.DB, query interface{}, preload string) model.SliceProvider[E] {
	var results []E
	var err error
	if preload != "" {
		err = db.Preload(preload).Where(query).Find(&results).Error
	} else {
		err = db.Where(query).Find(&results).Error
	}
	if err != nil {
		return model.ErrorSliceProvider[E](err)
	}
	return model.FixedSliceProvider(results)
}
