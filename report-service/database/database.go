package database

import (
	"database/sql"
	"fmt"
	"log"

	api "github.com/IbrahimKoutabli/report-service/api"
	"github.com/IbrahimKoutabli/report-service/env"
	_ "github.com/lib/pq"
)

var (
	host     = env.Settings.PsqlHost
	port     = env.Settings.PsqlPort
	user     = env.Settings.PsqlUser
	password = env.Settings.PsqlPassword
	dbname   = env.Settings.PsqlDBName
)

// ConnectToDatabase function opens a connection to the postgres database
func ConnectToDatabase() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("could not connect to database : %v\n", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalf("could not ping database : %v\n", err)
	}
	return db
}

// AddIncident insert an incident in the database
func AddIncident(db *sql.DB, incident *api.Incident) (*api.Incident, error) {
	var site = incident.BasicDetails.Site
	var basicDetails = incident.BasicDetails
	var moreDetails = incident.MoreDetails

	var siteID int32
	sqlStatement := `INSERT INTO site(siteName, contract, subCategory, locationDescription, safeToReturn)
					VALUES($1, $2, $3, $4, $5) RETURNING id`
	row := db.QueryRow(sqlStatement, site.SiteName, site.Contract, site.SubCategory, site.LocationDescription,
		site.SafeToReturn)
	err := row.Scan(&siteID)
	if err != nil {
		return nil, err
	}

	var basicDetailsID int32
	sqlStatement = `INSERT INTO basicDetails(environmental, category, subCategory, site)
					VALUES($1, $2, $3, $4) RETURNING id`
	err = db.QueryRow(sqlStatement, basicDetails.Environmental, basicDetails.Category,
		basicDetails.SubCategory, siteID).Scan(&basicDetailsID)
	if err != nil {
		return nil, err
	}

	var moreDetailsID int32
	sqlStatement = `INSERT INTO moreDetails(investigator, blueLight, reportedTo, potentialGreaterSeverity,
					personInjured, personTreatedByFirstAider, personFitToReturnToWork,
					immediateAction)  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
	err = db.QueryRow(sqlStatement, moreDetails.Investigator, moreDetails.BlueLight, moreDetails.ReportedTo, moreDetails.PotentialGreaterSeverity,
		moreDetails.PersonInjured, moreDetails.PersonTreatedByFirstAider, moreDetails.PersonFitToReturnToWork,
		moreDetails.ImmediateAction).Scan(&moreDetailsID)
	if err != nil {
		return nil, err
	}

	var incidentID int32
	sqlStatement = `INSERT INTO incident(date, time, details, basicDetails, moreDetails)
					VALUES($1, $2, $3, $4, $5) RETURNING id`
	err = db.QueryRow(sqlStatement, incident.Date, incident.Time, incident.Details,
		basicDetailsID, moreDetailsID).Scan(&incidentID)
	if err != nil {
		return nil, err
	}

	return GetIncident(db, incidentID)
}

// GetIncident query the database for a incident with id
func GetIncident(db *sql.DB, id int32) (*api.Incident, error) {
	incident := api.Incident{}
	basicDetails := api.Incident_BasicDetails{}
	moreDetails := api.Incident_MoreDetails{}
	site := api.Incident_BasicDetails_Site{}

	basicDetails.Site = &site
	incident.BasicDetails = &basicDetails
	incident.MoreDetails = &moreDetails
	incident.Id = id

	var basicDetailsID int
	var moreDetailsID int
	var siteID int

	sqlStatement := `SELECT date, time, details, basicDetails, moreDetails FROM incident WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	err := row.Scan(&incident.Date, &incident.Time, &incident.Details, &basicDetailsID, &moreDetailsID)
	if err != nil {
		return nil, err
	}

	sqlStatement = `SELECT environmental, category, subCategory, site FROM basicDetails WHERE id=$1;`
	row = db.QueryRow(sqlStatement, basicDetailsID)
	err = row.Scan(&basicDetails.Environmental, &basicDetails.Category, &basicDetails.SubCategory, &siteID)
	if err != nil {
		return nil, err
	}

	sqlStatement = `SELECT siteName, contract, subCategory, locationDescription, safeToReturn FROM site WHERE id=$1;`
	row = db.QueryRow(sqlStatement, siteID)
	err = row.Scan(&site.SiteName, &site.Contract, &site.SubCategory, &site.LocationDescription, &site.SafeToReturn)
	if err != nil {
		return nil, err
	}

	sqlStatement = `SELECT investigator, blueLight, reportedTo, potentialGreaterSeverity,
					personInjured, personTreatedByFirstAider, personFitToReturnToWork,
					immediateAction FROM moreDetails WHERE id=$1;`
	row = db.QueryRow(sqlStatement, moreDetailsID)
	err = row.Scan(&moreDetails.Investigator, &moreDetails.BlueLight, &moreDetails.ReportedTo, &moreDetails.PotentialGreaterSeverity,
		&moreDetails.PersonInjured, &moreDetails.PersonTreatedByFirstAider, &moreDetails.PersonFitToReturnToWork,
		&moreDetails.ImmediateAction)
	if err != nil {
		return nil, err
	}

	return &incident, err
}
