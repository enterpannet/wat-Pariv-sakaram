package routes

import (
	"github.com/enterpannet/wat-Pariv-sakaram/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.GET("/products", controllers.GetProducts)
	router.POST("/products", controllers.CreateProduct)
	router.PUT("/products/:id", controllers.UpdateProduct)
	router.DELETE("/products/:id", controllers.DeleteProduct)
	router.POST("/requests", controllers.CreateRequest)
	router.GET("/requests", controllers.GetRequests)
	router.PUT("/requests/:id/approve", controllers.ApproveRequest)

}
