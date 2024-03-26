package party

import (
	"gorm.io/gorm"
)

func create(db *gorm.DB) func(name string, hash string, firstName string, lastName string) (Model, error) {
	return func(name string, hash string, firstName string, lastName string) (Model, error) {
		e := &Entity{
			Name: name,
			Hash: hash,
			Members: []MemberEntity{
				{
					FirstName: firstName,
					LastName:  lastName,
				},
			},
		}

		err := db.Create(e).Error
		if err != nil {
			return Model{}, err
		}

		return modelFromEntity(*e)
	}
}

func addMember(db *gorm.DB) func(hash string, firstName string, lastName string) (Model, error) {
	return func(hash string, firstName string, lastName string) (Model, error) {
		var results Entity
		err := db.Where(&Entity{Hash: hash}).First(&results).Error
		if err != nil {
			return Model{}, err
		}

		newMember := MemberEntity{FirstName: firstName, LastName: lastName}
		results.Members = append(results.Members, newMember)
		err = db.Save(&results).Error
		if err != nil {
			return Model{}, err
		}

		return modelFromEntity(results)
	}
}

func modelFromEntity(a Entity) (Model, error) {
	ms := make([]MemberModel, 0)
	for _, m := range a.Members {
		ms = append(ms, MemberModel{
			FirstName: m.FirstName,
			LastName:  m.LastName,
		})
	}
	return Model{
		ID:      a.Hash,
		Name:    a.Name,
		Members: ms,
	}, nil
}
