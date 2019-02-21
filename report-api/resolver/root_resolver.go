package resolver

import api "github.com/IbrahimKoutabli/report-service/api"

// Resolver is the main api resolver
type Resolver struct {
	Reportconn api.IncidentReportClient
}
