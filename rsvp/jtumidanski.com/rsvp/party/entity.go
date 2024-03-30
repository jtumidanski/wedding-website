package party

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/party/member"
)

func Migration(db *gorm.DB) error {
	return db.AutoMigrate(&Entity{})
}

type Entity struct {
	gorm.Model
	ID      uuid.UUID       `gorm:"type:uuid;default:uuid_generate_v4()"`
	Name    string          `gorm:"unique;not null"`
	Hash    string          `gorm:"unique;not null"`
	Members []member.Entity `gorm:"foreignKey:PartyID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (Entity) TableName() string {
	return "parties"
}
