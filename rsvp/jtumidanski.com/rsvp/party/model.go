package party

import "jtumidanski.com/rsvp/party/member"

type Model struct {
	ID      string
	Name    string
	Hash    string
	Members []member.Model
}
