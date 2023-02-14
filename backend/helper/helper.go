package helper

import (
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
)

type responseAPI struct {
	Meta meta        `json:"meta"`
	Data interface{} `json:"data"`
}

type meta struct {
	Status  string `json:"status"`
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func ResponseAPI(status, message string, code int, data interface{}) responseAPI {
	meta := meta{
		Status:  status,
		Code:    code,
		Message: message,
	}

	return responseAPI{
		Meta: meta,
		Data: data,
	}
}

func GetEnv(path string) (map[string]string, error) {
	env, err := godotenv.Read(path)
	if err != nil {
		return env, err
	}

	return env, nil
}

func FormatErrorBinding(err error) []string {
	var errors []string

	for _, e := range err.(validator.ValidationErrors) {
		errors = append(errors, e.Error())
	}

	return errors
}
