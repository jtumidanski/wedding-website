package party

import (
	"github.com/agnivade/levenshtein"
	"github.com/antzucaro/matchr"
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

func GetAllBySearch(l logrus.FieldLogger, db *gorm.DB) func(search string) ([]Model, error) {
	return func(search string) ([]Model, error) {
		allProvider := database.ModelSliceProvider[Model, Entity](db)(getAll(), modelFromEntity)

		ps, err := allProvider()
		if err != nil {
			return nil, err
		}

		//var results = computeLevenshteinDistance(l)(search, ps)
		var results = computeJaroWinklerDistance(l)(search, ps)

		var lowest = ""
		for k, v := range results {
			if val, ok := results[lowest]; ok {
				if v > val {
					lowest = k
				}
			} else {
				lowest = k
			}
		}

		var ret = make([]Model, 0)
		for _, p := range ps {
			if lowest == p.ID {
				l.Debugf("Closest match is [%s].", p.Name)
				ret = append(ret, p)
			}
		}
		return ret, nil
	}
}

func computeLevenshteinDistance(l logrus.FieldLogger) func(search string, ps []Model) map[string]int {
	return func(search string, ps []Model) map[string]int {
		var results = make(map[string]int)
		for _, p := range ps {
			for _, m := range p.Members {
				fullName := m.FirstName + " " + m.LastName
				levenshteinDistance := levenshtein.ComputeDistance(fullName, search)
				l.Debugf("Computing levenshtein for [%s %s] off search [%s]. Distance=[%d]", m.FirstName, m.LastName, search, levenshteinDistance)

				if val, ok := results[p.ID]; ok {
					if val > levenshteinDistance {
						results[p.ID] = levenshteinDistance
					}
				} else {
					results[p.ID] = levenshteinDistance
				}
			}
		}
		return results
	}
}

func computeJaroWinklerDistance(l logrus.FieldLogger) func(search string, ps []Model) map[string]float64 {
	return func(search string, ps []Model) map[string]float64 {
		var results = make(map[string]float64)
		for _, p := range ps {
			for _, m := range p.Members {
				fullName := m.FirstName + " " + m.LastName
				distance := matchr.JaroWinkler(fullName, search, false)
				l.Debugf("Computing Jaro Winkler for [%s %s] off search [%s]. Distance=[%f]", m.FirstName, m.LastName, search, distance)

				if distance > 1 {
					continue
				}

				if val, ok := results[p.ID]; ok {
					if val < distance {
						results[p.ID] = distance
					}
				} else {
					results[p.ID] = distance
				}
			}
		}
		return results
	}
}
