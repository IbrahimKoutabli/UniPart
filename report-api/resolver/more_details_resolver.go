package resolver

import (
	model "github.com/IbrahimKoutabli/report-api/model"
)

type moreDetailsResolver struct {
	m *model.MoreDetails
}

func (r *moreDetailsResolver) Investigator() string {
	return r.m.Investigator
}

func (r *moreDetailsResolver) BlueLight() bool {
	return r.m.BlueLight
}

func (r *moreDetailsResolver) ReportedTo() string {
	return r.m.ReportedTo
}

func (r *moreDetailsResolver) PotentialGreaterSeverity() bool {
	return r.m.PotentialGreaterSeverity
}

func (r *moreDetailsResolver) PersonInjured() bool {
	return r.m.PersonInjured
}

func (r *moreDetailsResolver) PersonTreatedByFirstAider() bool {
	return r.m.PersonTreatedByFirstAider
}

func (r *moreDetailsResolver) PersonFitToReturnToWork() bool {
	return r.m.PersonFitToReturnToWork
}

func (r *moreDetailsResolver) ImmediateAction() string {
	return r.m.ImmediateAction
}
