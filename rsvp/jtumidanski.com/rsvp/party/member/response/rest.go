package response

type RestModel struct {
	ID        string   `json:"id"`
	Attending bool     `json:"attending"`
	Entree    string   `json:"entree"`
	Allergies []string `json:"allergies"`
}

func (p RestModel) GetID() string {
	return p.ID
}

func (p RestModel) SetID(id string) error {
	p.ID = id
	return nil
}

func (p RestModel) GetName() string {
	return "response"
}

func Transform(model Model) RestModel {
	return RestModel{
		ID:        model.ID,
		Attending: model.Attending,
		Entree:    model.Entree,
		Allergies: model.Allergies,
	}
}

func TransformAll(models []Model) []RestModel {
	rms := make([]RestModel, 0)
	for _, m := range models {
		rms = append(rms, Transform(m))
	}
	return rms
}
