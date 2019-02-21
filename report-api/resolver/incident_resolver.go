package resolver

import (
	"context"
	"log"

	api "github.com/IbrahimKoutabli/report-service/api"
	model "github.com/IbrahimKoutabli/report-api/model"

	graphql "github.com/graph-gophers/graphql-go"
)

type incidentResolver struct {
	m *model.Incident
}

func (r *incidentResolver) ID() graphql.ID {
	return graphql.ID(r.m.ID)
}

func (r *incidentResolver) Date() string {
	return r.m.Date
}

func (r *incidentResolver) Time() string {
	return r.m.Time
}

func (r *incidentResolver) Details() string {
	return r.m.Details
}

func (r *incidentResolver) BasicDetails() *basicDetailsResolver {
	return &basicDetailsResolver{r.m.IncidentBasicDetails}
}

func (r *incidentResolver) MoreDetails() *moreDetailsResolver {
	return &moreDetailsResolver{r.m.IncidentMoreDetails}
}

// GetIncident resolver for getIncident query
func (r *Resolver) GetIncident(ctx context.Context, args struct{ ID int32 }) (*incidentResolver, error) {

	l, err := r.Reportconn.GetIncident(context.Background(), &api.Id{Id: args.ID})
	if err != nil {
		log.Printf("could not get incident: %v\n", err)
	}

	var incident model.Incident
	incident.ID = l.GetId()
	incident.Date = l.GetDate()
	incident.Time = l.GetTime()
	incident.Details = l.GetDetails()

	var basicDetails model.BasicDetails
	basicDetails.Category = l.GetBasicDetails().GetCategory()
	basicDetails.Environmental = l.GetBasicDetails().GetEnvironmental()
	basicDetails.IncidentType = l.GetBasicDetails().GetIncidentType()
	basicDetails.SubCategory = l.GetBasicDetails().GetSubCategory()

	var site model.Site
	site.SiteName = l.GetBasicDetails().GetSite().GetSiteName()
	site.Contract = l.GetBasicDetails().GetSite().GetContract()
	site.LocationDescription = l.GetBasicDetails().GetSite().GetLocationDescription()
	site.SafeToReturn = l.GetBasicDetails().GetSite().GetSafeToReturn()
	site.SubCategory = l.GetBasicDetails().GetSite().GetSubCategory()
	basicDetails.Site = &site

	var moreDetails model.MoreDetails
	moreDetails.BlueLight = l.GetMoreDetails().GetBlueLight()
	moreDetails.ImmediateAction = l.GetMoreDetails().GetImmediateAction()
	moreDetails.Investigator = l.GetMoreDetails().GetInvestigator()
	moreDetails.PersonFitToReturnToWork = l.GetMoreDetails().GetPersonFitToReturnToWork()
	moreDetails.PersonInjured = l.GetMoreDetails().GetPersonInjured()
	moreDetails.PersonTreatedByFirstAider = l.GetMoreDetails().GetPersonTreatedByFirstAider()
	moreDetails.PotentialGreaterSeverity = l.GetMoreDetails().GetPotentialGreaterSeverity()
	moreDetails.ReportedTo = l.GetMoreDetails().GetReportedTo()

	incident.IncidentMoreDetails = &moreDetails
	incident.IncidentBasicDetails = &basicDetails

	return &incidentResolver{&incident}, nil
}

// AddIncident resolver for addIncident mutation
func (r *Resolver) AddIncident(ctx context.Context, args struct{ Incident api.Incident }) (*incidentResolver, error) {
	l, err := r.Reportconn.AddIncident(context.Background(), &args.Incident)
	if err != nil {
		log.Printf("could not get incident: %v\n", err)
	}
	var res model.Incident
	res.ID = l.GetId()
	res.Date = l.GetDate()
	res.Time = l.GetTime()
	res.Details = l.GetDetails()

	var basicDetails model.BasicDetails
	basicDetails.Category = l.GetBasicDetails().GetCategory()
	basicDetails.Environmental = l.GetBasicDetails().GetEnvironmental()
	basicDetails.IncidentType = l.GetBasicDetails().GetIncidentType()
	basicDetails.SubCategory = l.GetBasicDetails().GetSubCategory()

	var site model.Site
	site.SiteName = l.GetBasicDetails().GetSite().GetSiteName()
	site.Contract = l.GetBasicDetails().GetSite().GetContract()
	site.LocationDescription = l.GetBasicDetails().GetSite().GetLocationDescription()
	site.SafeToReturn = l.GetBasicDetails().GetSite().GetSafeToReturn()
	site.SubCategory = l.GetBasicDetails().GetSite().GetSubCategory()
	basicDetails.Site = &site

	var moreDetails model.MoreDetails
	moreDetails.BlueLight = l.GetMoreDetails().GetBlueLight()
	moreDetails.ImmediateAction = l.GetMoreDetails().GetImmediateAction()
	moreDetails.Investigator = l.GetMoreDetails().GetInvestigator()
	moreDetails.PersonFitToReturnToWork = l.GetMoreDetails().GetPersonFitToReturnToWork()
	moreDetails.PersonInjured = l.GetMoreDetails().GetPersonInjured()
	moreDetails.PersonTreatedByFirstAider = l.GetMoreDetails().GetPersonTreatedByFirstAider()
	moreDetails.PotentialGreaterSeverity = l.GetMoreDetails().GetPotentialGreaterSeverity()
	moreDetails.ReportedTo = l.GetMoreDetails().GetReportedTo()

	res.IncidentMoreDetails = &moreDetails
	res.IncidentBasicDetails = &basicDetails

	return &incidentResolver{&res}, nil
}
