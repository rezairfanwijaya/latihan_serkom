package handler

import (
	"net/http"
	"serkom/admin"
	"serkom/helper"

	"github.com/gin-gonic/gin"
)

type handlerAdmin struct {
	serviceAdmin admin.IService
}

func NewHandlerAdmin(serviceAdmin admin.IService) handlerAdmin {
	return handlerAdmin{
		serviceAdmin: serviceAdmin,
	}
}

func (h *handlerAdmin) Login(c *gin.Context) {
	var input admin.InputAdmin

	if err := c.BindJSON(&input); err != nil {
		myErr := helper.FormatErrorBinding(err)
		response := helper.ResponseAPI(
			"error",
			"gagal melakukan binding",
			http.StatusBadRequest,
			myErr,
		)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	admin, err := h.serviceAdmin.Login(input)
	if err != nil {
		response := helper.ResponseAPI(
			"error",
			"gagal melakukan login",
			http.StatusBadRequest,
			err.Error(),
		)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"sukses melakukan login",
		http.StatusOK,
		admin,
	)

	c.JSON(http.StatusBadRequest, response)
}
