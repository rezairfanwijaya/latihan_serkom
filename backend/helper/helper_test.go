package helper

import "testing"

func TestGetEnv(t *testing.T) {
	res, err := GetEnv("../.env")
	if err != nil {
		t.Fatal(err)
	}

	t.Log(res)
}
