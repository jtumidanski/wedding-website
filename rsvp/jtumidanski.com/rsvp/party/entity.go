package party

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Entity struct {
	gorm.Model
	ID      uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()"`
	Name    string         `gorm:"unique;not null"`
	Hash    string         `gorm:"unique;not null"`
	Members []MemberEntity `gorm:"foreignKey:PartyID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (Entity) TableName() string {
	return "parties"
}

func Migration(db *gorm.DB) error {
	return db.AutoMigrate(&Entity{}, &MemberEntity{})
}

type MemberEntity struct {
	gorm.Model
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	FirstName string
	LastName  string
	PartyID   uuid.UUID
}

func (MemberEntity) TableName() string {
	return "party_members"
}
