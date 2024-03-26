package party

type Model struct {
	ID      string
	Name    string
	Members []MemberModel
}

type MemberModel struct {
	FirstName string
	LastName  string
}
