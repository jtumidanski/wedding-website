package member

type RestModel struct {
	ID        string `json:"id"`
	FirstName string `json:"first-name"`
	LastName  string `json:"last-name"`
}

func (p RestModel) GetID() string {
	return p.ID
}

func (p RestModel) GetName() string {
	return "members"
}

func Transform(model Model) RestModel {
	return RestModel{
		ID:        model.ID,
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
