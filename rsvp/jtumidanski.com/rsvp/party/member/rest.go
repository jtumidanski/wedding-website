package member

import "fmt"

type RestModel struct {
	FirstName string `json:"first-name"`
	LastName  string `json:"last-name"`
}

func (p RestModel) GetID() string {
	return fmt.Sprintf("%s-%s", p.FirstName, p.LastName)
}

func (p RestModel) GetName() string {
	return "members"
}

func Transform(model Model) RestModel {
	return RestModel{
		FirstName: model.FirstName,
		LastName:  model.LastName,
	}
}

func TransformAll(models []Model) []RestModel {
	rms := make([]RestModel, 0)
	for _, m := range models {
		rms = append(rms, Transform(m))
	}
	return rms
}
