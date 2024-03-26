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
