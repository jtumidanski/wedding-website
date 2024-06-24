package response

import (
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"jtumidanski.com/rsvp/database"
	"jtumidanski.com/rsvp/party/member/response/log"
)

func Get(l logrus.FieldLogger, db *gorm.DB) func(memberId string) (Model, error) {
	return func(memberId string) (Model, error) {
		l.Debugf("Attempting to get member [%s].", memberId)
		memberUUID, err := uuid.Parse(memberId)
		if err != nil {
			l.WithError(err).Errorf("Invalid member uuid provided.")
			return Model{}, err
		}
		return database.ModelProvider[Model, Entity](db)(getByMemberId(memberUUID), MakeResponse)()
	}
}

func Update(l logrus.FieldLogger, db *gorm.DB) func(memberId string, attending bool, entree string, allergies string, ipAddress string) (Model, error) {
	return func(memberId string, attending bool, entree string, allergies string, ipAddress string) (Model, error) {
		l.Infof("Updating member [%s] response to show attending=[%t] entree=[%s] allergies=[%s].", memberId, attending, entree, allergies)
		l.Debugf("Member [%s] ip address=[%s]", memberId, ipAddress)
		memberUUID, err := uuid.Parse(memberId)
		if err != nil {
			l.WithError(err).Errorf("Invalid member uuid provided.")
			return Model{}, err
		}

		ret, err := update(db)(memberUUID, attending, entree, allergies)
		if err != nil {
			return Model{}, err
		}

		err = log.Create(l, db)(memberId, attending, entree, allergies, ipAddress)
		if err != nil {
			return Model{}, err
		}

		return ret, err
	}
}
