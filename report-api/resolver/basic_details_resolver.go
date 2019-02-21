package resolver

import (
	model "github.com/IbrahimKoutabli/report-api/model"
)

type basicDetailsResolver struct {
	m *model.BasicDetails
}

func (r *basicDetailsResolver) Environmental() bool {
	return r.m.Environmental
}

func (r *basicDetailsResolver) IncidentType() string {
	return r.m.IncidentType
}

func (r *basicDetailsResolver) Category() string {
	return r.m.Category
}

func (r *basicDetailsResolver) SubCategory() string {
	return r.m.SubCategory
}

func (r *basicDetailsResolver) Site() *siteResolver {
	return &siteResolver{r.m.Site}
}
