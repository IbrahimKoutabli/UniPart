package service

import (
	"database/sql"
	"fmt"
	"log"
	"net"

	api "github.com/IbrahimKoutabli/report-service/api"
	database "github.com/IbrahimKoutabli/report-service/database"
	env "github.com/IbrahimKoutabli/report-service/env"
	router "github.com/IbrahimKoutabli/report-service/router"
	grpc "google.golang.org/grpc"
)

var (
	db *sql.DB
)

func Start() {
	s := grpc.NewServer()
	db = database.ConnectToDatabase()
	defer db.Close()

	server := router.New(db)
	api.RegisterIncidentReportServer(s, server)
	l, err := net.Listen("tcp", fmt.Sprintf(":%d", env.Settings.GrpcPort))
	if err != nil {
		log.Fatalf("could not listen on port %d: : %v\n", env.Settings.GrpcPort, err)
	}
	log.Fatal(s.Serve(l))
}
