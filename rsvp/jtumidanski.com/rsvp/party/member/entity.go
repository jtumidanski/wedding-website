package member

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/party/member/response"
)

func Migration(db *gorm.DB) error {
	return db.AutoMigrate(&Entity{})
}

type Entity struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	FirstName string
	LastName  string
	PartyID   uuid.UUID       `gorm:"type:uuid"`
	Response  response.Entity `gorm:"foreignKey:MemberID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (Entity) TableName() string {
	return "members"
}
