package database

import (
	"log"

	"github.com/enterpannet/wat-Pariv-sakaram/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=210.246.215.231 user=watRoot password=wat123546 dbname=testwat port=5432 sslmode=disable"
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// AutoMigrate models
	DB.AutoMigrate(&models.User{}, &models.Product{})
	log.Println("Database connected!")
}
