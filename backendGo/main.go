package main

import (
	"log"
	"os"

	"github.com/enterpannet/wat-Pariv-sakaram/database"
	"github.com/enterpannet/wat-Pariv-sakaram/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// เชื่อมต่อ Database
	database.ConnectDB()
	// Ensure the upload directory exists
	if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
		os.Mkdir("./uploads", os.ModePerm)
	}

	// ตั้งค่า Router
	router := gin.Default()

	// Register Routes
	routes.RegisterRoutes(router)

	// Run the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
