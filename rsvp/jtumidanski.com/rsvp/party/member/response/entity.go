package response

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func Migration(db *gorm.DB) error {
	return db.AutoMigrate(&Entity{})
}

type Entity struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Attending bool
	Entree    string
	Allergies string
	MemberID  uuid.UUID `gorm:"type:uuid"`
}

func (Entity) TableName() string {
	return "responses"
}
