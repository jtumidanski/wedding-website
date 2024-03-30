package party

import (
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/party/member"
	"jtumidanski.com/rsvp/party/member/response"
)

func create(db *gorm.DB) func(name string, hash string, firstName string, lastName string) (Model, error) {
	return func(name string, hash string, firstName string, lastName string) (Model, error) {
		tx := db.Begin()
		defer func() {
			if r := recover(); r != nil {
				tx.Rollback()
			}
		}()
		if tx.Error != nil {
			return Model{}, tx.Error
		}

		e := Entity{
			Name: name,
			Hash: hash,
		}
		if err := tx.Create(&e).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		m := member.Entity{
			FirstName: firstName,
			LastName:  lastName,
			PartyID:   e.ID,
		}
		if err := tx.Create(&m).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		r := response.Entity{Attending: false, MemberID: m.ID}
		if err := tx.Create(&r).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		err := tx.Commit().Error
		if err != nil {
			return Model{}, err
		}

		m.Response = r
		e.Members = append(e.Members, m)

		return modelFromEntity(e)
	}
}

func addMember(db *gorm.DB) func(hash string, firstName string, lastName string) (Model, error) {
	return func(hash string, firstName string, lastName string) (Model, error) {
		tx := db.Begin()
		defer func() {
			if r := recover(); r != nil {
				tx.Rollback()
			}
		}()
		if tx.Error != nil {
			return Model{}, tx.Error
		}

		var e Entity
		err := tx.Where(&Entity{Hash: hash}).First(&e).Error
		if err != nil {
			return Model{}, err
		}

		m := member.Entity{
			FirstName: firstName,
			LastName:  lastName,
			PartyID:   e.ID,
		}
		if err = tx.Create(&m).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		r := response.Entity{Attending: false, MemberID: m.ID}
		if err = tx.Create(&r).Error; err != nil {
			tx.Rollback()
			return Model{}, err
		}

		err = tx.Commit().Error
		if err != nil {
			return Model{}, err
		}

		m.Response = r
		e.Members = append(e.Members, m)

		return modelFromEntity(e)
	}
}

func modelFromEntity(a Entity) (Model, error) {
	ms := make([]member.Model, 0)
	for _, m := range a.Members {
		mm, err := member.MakeMember(m)
		if err == nil {
			ms = append(ms, mm)
		}
	}
	return Model{
		ID:      a.ID.String(),
		Name:    a.Name,
		Hash:    a.Hash,
		Members: ms,
	}, nil
}
