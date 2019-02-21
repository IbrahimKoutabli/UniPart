package model

type Incident struct {
	ID                   int32
	Date                 string
	Time                 string
	Details              string
	IncidentBasicDetails *BasicDetails
	IncidentMoreDetails  *MoreDetails
}

type BasicDetails struct {
	Environmental bool
	IncidentType  string
	Category      string
	SubCategory   string
	Site          *Site
}

type Site struct {
	SiteName            string
	Contract            string
	SubCategory         string
	LocationDescription string
	SafeToReturn        bool
}

type MoreDetails struct {
	Investigator              string
	BlueLight                 bool
	ReportedTo                string
	PotentialGreaterSeverity  bool
	PersonInjured             bool
	PersonTreatedByFirstAider bool
	PersonFitToReturnToWork   bool
	ImmediateAction           string
}
