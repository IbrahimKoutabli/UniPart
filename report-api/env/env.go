package env

import (
	"github.com/spf13/viper"
)

type Config struct {
	GrpcPort int
	HttpPort int
}

var Settings *Config

func init() {
	viper.AutomaticEnv()
	viper.SetEnvPrefix("REPORTAPI")

	viper.SetDefault("GRPC_PORT", 8888)
	viper.SetDefault("HTTP_PORT", 8080)

	Settings = &Config{
		GrpcPort: viper.GetInt("GRPC_PORT"),
		HttpPort: viper.GetInt("HTTP_PORT"),
	}
}
