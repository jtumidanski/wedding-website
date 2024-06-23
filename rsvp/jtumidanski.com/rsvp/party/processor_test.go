package party

import (
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"github.com/sirupsen/logrus/hooks/test"
	"jtumidanski.com/rsvp/party/member"
	"jtumidanski.com/rsvp/party/member/response"
	"sync"
	"testing"
)

type Name struct {
	FirstName string
	LastName  string
}

func makeMockParty(names ...Name) Model {
	var members = make([]member.Model, 0)
	for _, name := range names {
		members = append(members, member.Model{
			ID:        uuid.New().String(),
			FirstName: name.FirstName,
			LastName:  name.LastName,
			Response:  response.Model{},
		})
	}
	return Model{
		ID:      uuid.New().String(),
		Name:    members[0].FirstName + " " + members[0].LastName,
		Hash:    "",
		Members: members,
	}
}

var once sync.Once
var results []Model

func mockAllProvider() ([]Model, error) {
	once.Do(func() {
		results = make([]Model, 0)
		results = append(results, makeMockParty(Name{"Corey", "Borgman"}, Name{"Rachel", "Wright"}))
		results = append(results, makeMockParty(Name{"Michael", "Scruggs"}, Name{"Mike's", "Guest"}))
		results = append(results, makeMockParty(Name{"Elaine", "Roberts"}, Name{"Brendo", "Roberts"}))
		results = append(results, makeMockParty(Name{"Ed", "Carlson"}, Name{"Jody", "Carlson"}))
		results = append(results, makeMockParty(Name{"Jekka", "Davis"}, Name{"Jekka's", "Guest"}))
		results = append(results, makeMockParty(Name{"Thomas", "McClung"}, Name{"Candy", "McClung"}))
		results = append(results, makeMockParty(Name{"Cody", "Finch"}, Name{"Cody's", "Guest"}))
		results = append(results, makeMockParty(Name{"Peggy", "Frizzo"}, Name{"John", "Frizzo"}))
		results = append(results, makeMockParty(Name{"Kristopher", "Gusky"}, Name{"Kristopher's", "Guest"}))
		results = append(results, makeMockParty(Name{"Toran", "Keith"}, Name{"Ashley", "Flanagin"}))
		results = append(results, makeMockParty(Name{"Tyler", "Kelsey"}, Name{"Emily ", "Kelsey"}))
		results = append(results, makeMockParty(Name{"Norman", "Carlson"}, Name{"Karen", "Carlson"}))
		results = append(results, makeMockParty(Name{"Alden", "Phillips"}, Name{"Austin", "VanVelsen"}))
		results = append(results, makeMockParty(Name{"Matt", "Tithof"}, Name{"Rachel", "Tithof"}))
		results = append(results, makeMockParty(Name{"David", "Tumidanski"}, Name{"Kris", "Tumidanski"}))
		results = append(results, makeMockParty(Name{"Carol", "Blunt"}, Name{"Ward ", "Blunt"}))
		results = append(results, makeMockParty(Name{"Cindy", "Kusmack"}, Name{"Kevin", "Kusmack"}))
		results = append(results, makeMockParty(Name{"Crystal", "Haefner"}, Name{"Bruce", "Haefner"}))
		results = append(results, makeMockParty(Name{"Sheree", "Slott"}, Name{"Jim", "Slott"}))
		results = append(results, makeMockParty(Name{"Mary", "Simpson"}, Name{"Jim", "Tumidanski"}))
		results = append(results, makeMockParty(Name{"Brian", "Spratke"}, Name{"Becky", "Spratke"}))
		results = append(results, makeMockParty(Name{"Nate", "Ver Beek"}, Name{"Ann", "Ver Beek"}))
		results = append(results, makeMockParty(Name{"Ron", "Beckett"}, Name{"Tammy", "Beckett"}))
		results = append(results, makeMockParty(Name{"Joshanne", "Chu"}, Name{"Joe", "Chu"}))
		results = append(results, makeMockParty(Name{"Cressa", "Powell"}, Name{"Justin", "Powell"}))
		results = append(results, makeMockParty(Name{"Christy", "Cardell"}, Name{"Jake", "Cardell"}))
		results = append(results, makeMockParty(Name{"Lyndsay", "Dean"}, Name{"Brock", "Dean"}))
		results = append(results, makeMockParty(Name{"Connor", "Larson"}, Name{"Stephanie", "Larson"}))
		results = append(results, makeMockParty(Name{"Gerard", "Louis"}, Name{"Katie", "Louis"}))
		results = append(results, makeMockParty(Name{"Kyle", "Hashman"}, Name{"Kari", "Hashman"}))
		results = append(results, makeMockParty(Name{"Nick", "Workman"}, Name{"Katelyn", "Workman"}))
		results = append(results, makeMockParty(Name{"Shane", "Sipple"}, Name{"Sarah", "Sipple"}))
		results = append(results, makeMockParty(Name{"Travis", "Zielaskowski"}, Name{"Travis's", "Guest"}))
		results = append(results, makeMockParty(Name{"Trevor", "Blossom"}, Name{"Colleen", "Zeichman"}))
		results = append(results, makeMockParty(Name{"Cody ", "Taggart "}, Name{"Candi ", "Miller"}))
		results = append(results, makeMockParty(Name{"McKenna", "Kusmack"}, Name{"McKenna's", "Guest"}))
		results = append(results, makeMockParty(Name{"Wyatt", "Kusmack"}, Name{"Wyatt's", "Guest"}))
		results = append(results, makeMockParty(Name{"Katarina", "Kusmack"}, Name{"Colten", "Vincent"}))
		results = append(results, makeMockParty(Name{"Jordan", "Carlson"}, Name{"Kourtney", "Mitchell"}))
		results = append(results, makeMockParty(Name{"Seth", "Carlson"}, Name{"Bradley", "Smith"}))
		results = append(results, makeMockParty(Name{"Blake", "Carlson"}, Name{"Blake 's", "Guest"}))
		results = append(results, makeMockParty(Name{"Jennifer", "Klein"}, Name{"Jennifer 's", "Guest"}))
		results = append(results, makeMockParty(Name{"Tiffany", "Horvath"}, Name{"Arlo", "Horvath"}))
		results = append(results, makeMockParty(Name{"Justin", "Klein"}, Name{"Lindsay", "Klein"}))
		results = append(results, makeMockParty(Name{"Cade", "Klein"}, Name{"Eva", "Klein"}))
		results = append(results, makeMockParty(Name{"Emily", "Carlson"}, Name{"Nelson", "Torre"}))
		results = append(results, makeMockParty(Name{"Whitney", "Roberts"}, Name{"Simon", "Roberts"}))
		results = append(results, makeMockParty(Name{"Angee", "Ellis"}, Name{"Bruce", "Tavernier"}))
		results = append(results, makeMockParty(Name{"Nicki", "Houser"}, Name{"Tommy", "Houser"}))
		results = append(results, makeMockParty(Name{"Katherine", "Vidaurri"}, Name{"Jackson", "Vidaurri"}))
		results = append(results, makeMockParty(Name{"Luke", "Gomori"}, Name{"Luke's", "Guest"}))
		results = append(results, makeMockParty(Name{"Jack", "Gomori"}, Name{"Lucy", "Dinsmore"}))
		results = append(results, makeMockParty(Name{"Sharyn", "Mertz"}, Name{"Roger", "Mertz"}))
		results = append(results, makeMockParty(Name{"Ryan", "Mertz"}, Name{"Allison", "Mertz"}))
		results = append(results, makeMockParty(Name{"Ashley", "Berthiaume"}, Name{"Joe", "Berthiaume"}))
		results = append(results, makeMockParty(Name{"Kyle", "Simpson"}, Name{"Melanie", "Simpson"}))
		results = append(results, makeMockParty(Name{"Tony", "Mosesso"}, Name{"Erin", "Mosesso"}))
		results = append(results, makeMockParty(Name{"Craig", "Moore"}, Name{"Laura", "Arndt"}))
		results = append(results, makeMockParty(Name{"Pieter", "Vander Laan"}, Name{"Pieter's", "Guest"}))
		results = append(results, makeMockParty(Name{"Valarie", "Dreliozis"}, Name{"Valarie's", "Guest"}))
		results = append(results, makeMockParty(Name{"Loren", "Koella"}, Name{"Nate", "Koella"}))
		results = append(results, makeMockParty(Name{"Daniel", "Lester"}, Name{"Daniel's", "Guest"}))
		results = append(results, makeMockParty(Name{"Howe", "Sim"}, Name{"Howe's", "Guest"}))
		results = append(results, makeMockParty(Name{"Matthew", "Gusky"}, Name{"Kady", "Gusky"}))
		results = append(results, makeMockParty(Name{"Kathy", "Moerman"}, Name{"Terry", "Moerman"}))
		results = append(results, makeMockParty(Name{"Juris", "Kapps"}, Name{"Mary", "Kapps"}))
		results = append(results, makeMockParty(Name{"Kathy", "Drew"}, Name{"Mark", "Drew"}))
		results = append(results, makeMockParty(Name{"Don", "Shaw"}, Name{"Randi", "Shaw"}))
		results = append(results, makeMockParty(Name{"Mark", "Nolte"}, Name{"Cindy", "Nolte"}))
		results = append(results, makeMockParty(Name{"Dustin", "Colwell"}, Name{"Dustin's", "Guest"}))
		results = append(results, makeMockParty(Name{"Brendan", "McSorley"}, Name{"Aubrey", "McSorley"}))
		results = append(results, makeMockParty(Name{"Mike", "Simpson"}, Name{"Samantha", "Simpson"}))
		results = append(results, makeMockParty(Name{"Rob", "Graves-Wesolosky"}, Name{"Patti", "Graves-Wesolosky"}))
		results = append(results, makeMockParty(Name{"Anna", "Garcia"}, Name{"Carlos", "Garcia"}))
		results = append(results, makeMockParty(Name{"Dan", "Morrison"}, Name{"Linda", "Morrison"}))
		results = append(results, makeMockParty(Name{"Caleb", "OTB"}, Name{"Erica", "OTB"}))
		results = append(results, makeMockParty(Name{"Lauren", "Slott"}, Name{"Sean", "Cole"}))
		results = append(results, makeMockParty(Name{"Jason", "Higgs"}, Name{"Alan", "Higgs"}, Name{"Freddie", "Powell"}))
		results = append(results, makeMockParty(Name{"Kevin", "Simpson"}))
		results = append(results, makeMockParty(Name{"Lexi", "Graves-Wesolosky"}))
		results = append(results, makeMockParty(Name{"Rob Jr.", "Graves-Wesolosky"}))
		results = append(results, makeMockParty(Name{"Steve", "Graves-Wesolosky"}))
		results = append(results, makeMockParty(Name{"Devin", "Burns"}))
		results = append(results, makeMockParty(Name{"Sasha", "Keeling"}))
	})
	return results, nil
}

type validator func(p Model) bool

func idValidator(id string) validator {
	return func(p Model) bool {
		return id != p.ID
	}
}

func memberNameValidator(first string, last string) validator {
	return func(p Model) bool {
		for _, m := range p.Members {
			if first == m.FirstName && last == m.LastName {
				return false
			}
		}
		return true
	}
}

func jaroWinklerTest(t *testing.T) func(l logrus.FieldLogger) func(search string, validator validator) {
	return func(l logrus.FieldLogger) func(search string, validator validator) {
		return func(search string, validator validator) {
			t.Logf("Testing [%s]", search)

			sr, err := getAllBySearch(mockAllProvider, jaroWinklerDistanceComputer(l)(search), findLeastJaroWinkler(l)(search))()
			if err != nil {
				t.Logf("Unexpected error getting results: %s", err.Error())
				t.FailNow()
			}

			if len(sr) == 0 {
				t.Log("No results found")
				t.FailNow()
			}

			if validator(sr[0]) {
				t.Log("Wrong ID")
				t.FailNow()
				return
			}

			t.Logf("Found [%s]", sr[0].Name)
		}
	}
}

func TestNameStandard(t *testing.T) {
	mockLogger, hook := test.NewNullLogger()
	hook.Reset()

	ps, err := mockAllProvider()
	if err != nil {
		t.Fail()
	}

	for _, p := range ps {
		for _, m := range p.Members {
			search := m.FirstName + " " + m.LastName
			jaroWinklerTest(t)(mockLogger)(search, idValidator(p.ID))
		}
	}
}

type AltNameTest struct {
	Search    string
	validator validator
}

func TestAltName(t *testing.T) {
	mockLogger, hook := test.NewNullLogger()
	hook.Reset()

	var tests = make([]AltNameTest, 0)
	tests = append(tests, AltNameTest{"Matthew Tithof", memberNameValidator("Matt", "Tithof")})
	tests = append(tests, AltNameTest{"Mike Scruggs", memberNameValidator("Michael", "Scruggs")})
	tests = append(tests, AltNameTest{"Jessica Davis", memberNameValidator("Jekka", "Davis")})
	tests = append(tests, AltNameTest{"Kris Gusky", memberNameValidator("Kristopher", "Gusky")})
	tests = append(tests, AltNameTest{"Kristen Tumidanski", memberNameValidator("Kris", "Tumidanski")})
	tests = append(tests, AltNameTest{"Rebecca Spratke", memberNameValidator("Becky", "Spratke")})
	tests = append(tests, AltNameTest{"Nathan Ver Beek", memberNameValidator("Nate", "Ver Beek")})
	tests = append(tests, AltNameTest{"Katherine Louis", memberNameValidator("Katie", "Louis")})
	tests = append(tests, AltNameTest{"Nicholas Workman", memberNameValidator("Nick", "Workman")})
	tests = append(tests, AltNameTest{"Nathan Koella", memberNameValidator("Nate", "Koella")})
	tests = append(tests, AltNameTest{"Daniel Morrison", memberNameValidator("Dan", "Morrison")})

	for _, test := range tests {
		jaroWinklerTest(t)(mockLogger)(test.Search, test.validator)
	}
}

func TestSpacing(t *testing.T) {
	mockLogger, hook := test.NewNullLogger()
	hook.Reset()

	var tests = make([]AltNameTest, 0)
	tests = append(tests, AltNameTest{"Nate VerBeek", memberNameValidator("Nate", "Ver Beek")})
	tests = append(tests, AltNameTest{"KyleSimpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"Kyle&Melanie Simpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"Kyle&MelanieSimpson", memberNameValidator("Kyle", "Simpson")})

	for _, test := range tests {
		jaroWinklerTest(t)(mockLogger)(test.Search, test.validator)
	}
}

func TestCasing(t *testing.T) {
	mockLogger, hook := test.NewNullLogger()
	hook.Reset()

	var tests = make([]AltNameTest, 0)
	tests = append(tests, AltNameTest{"kyle simpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"kyle Simpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"kylesimpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"kyleSimpson", memberNameValidator("Kyle", "Simpson")})
	tests = append(tests, AltNameTest{"Kylesimpson", memberNameValidator("Kyle", "Simpson")})

	for _, test := range tests {
		jaroWinklerTest(t)(mockLogger)(test.Search, test.validator)
	}
}
