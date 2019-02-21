package service

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"

	api "github.com/IbrahimKoutabli/report-service/api"
	"github.com/IbrahimKoutabli/report-api/env"
	resolver "github.com/IbrahimKoutabli/report-api/resolver"
	"google.golang.org/grpc"

	"github.com/gorilla/handlers"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

func getSchemaFromFile(path string) (string, error) {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}
	return string(file), nil
}

func disableCors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Max-Age", "86400")
			w.WriteHeader(http.StatusOK)
			return
		}
		h.ServeHTTP(w, r)
	})
}

//Start the graphql
func Start(wg *sync.WaitGroup) {

	schema, err := getSchemaFromFile("./api/schema.graphql")
	if err != nil {
		log.Fatalf("could not open schema file: %v\n", err)
	}
	conn, err := grpc.Dial(fmt.Sprintf(":%d", env.Settings.GrpcPort), grpc.WithInsecure())
	if err != nil {
		log.Printf("could not connect to grpc service: %v\n", err)
	}
	client := api.NewIncidentReportClient(conn)
	parsedSchema, err := graphql.ParseSchema(schema, &resolver.Resolver{Reportconn: client})
	if err != nil {
		log.Fatalf("could not parse schema file: %v\n", err)
	}

	http.Handle("/query", disableCors(&relay.Handler{Schema: parsedSchema}))
	fmt.Println("here")
	wg.Add(1)
	go func() {
		defer wg.Done()
		log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", env.Settings.HttpPort), handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)))
	}()
}

//StartStandalone to start the graphql standalone
func StartStandalone() {

	schema, err := getSchemaFromFile("./api/schema.graphql")
	if err != nil {
		log.Fatalf("could not open schema file: %v\n", err)
	}
	conn, err := grpc.Dial(fmt.Sprintf(":%d", env.Settings.GrpcPort), grpc.WithInsecure())
	if err != nil {
		log.Printf("could not connect to grpc service: %v\n", err)
	}
	client := api.NewIncidentReportClient(conn)
	parsedSchema, err := graphql.ParseSchema(schema, &resolver.Resolver{Reportconn: client})
	if err != nil {
		log.Fatalf("could not parse schema file: %v\n", err)
	}

	http.Handle("/query", disableCors(&relay.Handler{Schema: parsedSchema}))
	fmt.Println("here")

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", env.Settings.HttpPort), handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)))
}
