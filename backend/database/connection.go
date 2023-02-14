package database

import (
	"fmt"
	"serkom/admin"
	"serkom/helper"
	"serkom/reservasi"
	"serkom/wisata"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GetConnection(path string) (*gorm.DB, error) {
	// get env
	env, err := helper.GetEnv(path)
	if err != nil {
		return nil, err
	}

	username := env["USERNAME"]
	password := env["PASSWORD"]
	host := env["HOST"]
	port := env["PORT"]
	dbName := env["DB_NAME"]

	dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local",
		username,
		password,
		host,
		port,
		dbName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return db, err
	}

	// migrate schema
	if err := db.AutoMigrate(&wisata.Wisata{}, &admin.Admin{}, &reservasi.Reservasi{}); err != nil {
		return db, err
	}

	adminData := admin.Admin{
		Email:    "admin@gmail.com",
		Password: "12345",
	}

	db.Create(&adminData)

	return db, nil
}
