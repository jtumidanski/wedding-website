package member

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func Migration(db *gorm.DB) error {
	return db.AutoMigrate(&Entity{})
}

type Entity struct {
	gorm.Model
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	FirstName string
	LastName  string
	PartyID   uuid.UUID
}

func (Entity) TableName() string {
	return "party_members"
}
