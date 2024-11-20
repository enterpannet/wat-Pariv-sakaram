package controllers

import (
	"fmt"
	"net/http"

	"github.com/enterpannet/wat-Pariv-sakaram/database"
	"github.com/enterpannet/wat-Pariv-sakaram/models"
	"github.com/gin-gonic/gin"
)

type RequestInput struct {
	Name string `form:"name" binding:"required"`
	Date string `form:"date" binding:"required"`
}

// Upload directory
const UploadDir = "./uploads"

func CreateRequest(c *gin.Context) {
	var input RequestInput
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := c.FormFile("evidence")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Evidence file is required"})
		return
	}

	// Save the uploaded file
	filePath := fmt.Sprintf("%s/%s", UploadDir, file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Create request in database
	request := models.Request{
		Name:        input.Name,
		Date:        input.Date,
		EvidenceURL: filePath,
		Status:      "pending",
	}

	if err := database.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Request created", "request": request})
}

func GetRequests(c *gin.Context) {
	var requests []models.Request
	database.DB.Find(&requests)
	c.JSON(http.StatusOK, requests)
}

func ApproveRequest(c *gin.Context) {
	id := c.Param("id")
	var request models.Request
	if err := database.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	request.Status = "approved"
	database.DB.Save(&request)
	c.JSON(http.StatusOK, gin.H{"message": "Request approved", "request": request})
}
