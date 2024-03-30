package party

import (
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/model"
)

func Create(l logrus.FieldLogger, db *gorm.DB) func(name string, hash string, firstName string, lastName string) (Model, error) {
	return func(name string, hash string, firstName string, lastName string) (Model, error) {
		l.Debugf("Creating party[%s] with hash [%s] for [%s %s]", name, hash, firstName, lastName)
		m, err := create(db)(name, hash, firstName, lastName)
		if err != nil {
			l.WithError(err).Errorf("Unable to create party for %s %s", firstName, lastName)
			return m, err
		}
		return m, nil
	}
}

func AddMember(l logrus.FieldLogger, db *gorm.DB) func(hash string, firstName string, lastName string) (Model, error) {
	return func(hash string, firstName string, lastName string) (Model, error) {
		_, err := GetByHash(l, db)(hash)
		if err != nil {
			l.WithError(err).Errorf("Unable to add [%s %s] to party [%s].", firstName, lastName, hash)
			return Model{}, err
		}
		p, err := addMember(db)(hash, firstName, lastName)
		if err != nil {
			l.WithError(err).Errorf("Unable to add [%s %s] to party [%s].", firstName, lastName, hash)
			return Model{}, err
		}
		return p, nil
	}
}

func GetByHash(l logrus.FieldLogger, db *gorm.DB) func(hash string) (Model, error) {
	return func(hash string) (Model, error) {
		m, err := byHashProvider(db)(hash)()
		if err != nil {
			l.WithError(err).Errorf("Unable to locate party with hash %s.", hash)
			return Model{}, err
		}
		return m, nil
	}
}

func byHashProvider(db *gorm.DB) func(hash string) model.Provider[Model] {
	return func(hash string) model.Provider[Model] {
		return database.ModelProvider[Model, Entity](db)(entityByHash(hash), modelFromEntity)
	}
}

func GetAll(_ logrus.FieldLogger, db *gorm.DB) ([]Model, error) {
	return database.ModelSliceProvider[Model, Entity](db)(getAll(), modelFromEntity)()
}

func MatchHashFilter(hash string) func(model Model) bool {
	return func(model Model) bool {
		return model.Hash == hash
	}
}

func GetAllByHash(_ logrus.FieldLogger, db *gorm.DB) func(hash string) ([]Model, error) {
	return func(hash string) ([]Model, error) {
		allProvider := database.ModelSliceProvider[Model, Entity](db)(getAll(), modelFromEntity)
		return model.FilteredProvider(allProvider, MatchHashFilter(hash))()
	}
}
