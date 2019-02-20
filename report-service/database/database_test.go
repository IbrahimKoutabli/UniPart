package database

import (
	"fmt"
	"testing"

	api "github.com/IbrahimKoutabli/report-service/api"
)

func TestAddIncident(t *testing.T) {
	db := ConnectToDatabase()
	var incident = api.Incident{}
	var basicDetails = api.Incident_BasicDetails{}
	var moreDetails = api.Incident_MoreDetails{}
	var site = api.Incident_BasicDetails_Site{}
	basicDetails.Site = &site
	incident.Details = "test"
	incident.BasicDetails = &basicDetails
	incident.MoreDetails = &moreDetails

	incident2, _ := AddIncident(db, &incident)
	fmt.Printf("%d", incident2.Id)
}
