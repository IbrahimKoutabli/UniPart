package resolver

import (
	model "github.com/IbrahimKoutabli/report-api/model"
)

type siteResolver struct {
	m *model.Site
}

func (r *siteResolver) SiteName() string {
	return r.m.SiteName
}

func (r *siteResolver) Contract() string {
	return r.m.Contract
}

func (r *siteResolver) SubCategory() string {
	return r.m.SubCategory
}

func (r *siteResolver) LocationDescription() string {
	return r.m.LocationDescription
}

func (r *siteResolver) SafeToReturn() bool {
	return r.m.SafeToReturn
}
