package router

import (
	"context"
	"database/sql"
	"errors"

	api "github.com/IbrahimKoutabli/report-service/api"
	database "github.com/IbrahimKoutabli/report-service/database"
)

type incidentReportServer struct {
	db *sql.DB
}

func New(db *sql.DB) *incidentReportServer {
	return &incidentReportServer{db}
}

func (s incidentReportServer) GetIncident(ctx context.Context, id *api.Id) (*api.Incident, error) {
	incident, err := database.GetIncident(s.db, id.Id)
	switch err {
	case sql.ErrNoRows:
		return nil, errors.New("incident not found")
	case nil:
		return incident, nil
	default:
		return nil, errors.New("could not fetch incident")
	}
}

func (s incidentReportServer) AddIncident(ctx context.Context, incident *api.Incident) (*api.Incident, error) {
	incident, err := database.AddIncident(s.db, incident)
	switch err {
	case nil:
		return incident, nil
	default:
		return nil, errors.New("could not add incident")
	}
}
