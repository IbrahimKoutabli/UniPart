package env

import (
	"github.com/spf13/viper"
)

type Config struct {
	GrpcPort     int
	PsqlHost     string
	PsqlPort     int
	PsqlUser     string
	PsqlPassword string
	PsqlDBName   string
}

var Settings *Config

func init() {
	viper.AutomaticEnv()
	viper.SetEnvPrefix("REPORTSERVICE")

	viper.SetDefault("GRPC_PORT", 8888)
	viper.SetDefault("PSQL_PORT", 5432)
	viper.SetDefault("PSQL_HOST", "localhost")
	viper.SetDefault("PSQL_USER", "test")
	viper.SetDefault("PSQL_PASSWORD", "password")
	viper.SetDefault("PSQL_DBNAME", "testdb")

	Settings = &Config{
		GrpcPort:     viper.GetInt("GRPC_PORT"),
		PsqlHost:     viper.GetString("PSQL_HOST"),
		PsqlPort:     viper.GetInt("PSQL_PORT"),
		PsqlUser:     viper.GetString("PSQL_USER"),
		PsqlPassword: viper.GetString("PSQL_PASSWORD"),
		PsqlDBName:   viper.GetString("PSQL_DBNAME"),
	}
}
