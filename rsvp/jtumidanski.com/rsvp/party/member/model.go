package member

import "jtumidanski.com/rsvp/party/member/response"

type Model struct {
	ID        string
	FirstName string
	LastName  string
	Response  response.Model
}
