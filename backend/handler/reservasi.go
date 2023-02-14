package handler

import (
	"net/http"
	"serkom/helper"
	"serkom/reservasi"

	"github.com/gin-gonic/gin"
)

type handlerReservasi struct {
	serviceReservasi reservasi.IService
}

func NewHandlerReservasi(serviceReservasi reservasi.IService) *handlerReservasi {
	return &handlerReservasi{
		serviceReservasi: serviceReservasi,
	}
}

func (h *handlerReservasi) SaveReservasi(c *gin.Context) {
	var input reservasi.InputNewReservasi

	if err := c.BindJSON(&input); err != nil {
		errBind := helper.FormatErrorBinding(err)
		response := helper.ResponseAPI(
			"error",
			"error binding",
			http.StatusBadRequest,
			errBind,
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	if err := h.serviceReservasi.CreateReservasi(input); err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal menyimpan reservasi",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"sukses menyimpan reservasi",
		http.StatusOK,
		nil,
	)

	c.JSON(http.StatusOK, response)
}

func (h *handlerReservasi) GetStatistikPengunjung(c *gin.Context) {
	totalPengunjung, err := h.serviceReservasi.GetTotalPengunjung()
	if err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal mengambil statistik",
			http.StatusInternalServerError,
			err.Error(),
		)

		c.JSON(http.StatusInternalServerError, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"sukses mengambil statistik",
		http.StatusOK,
		totalPengunjung,
	)

	c.JSON(http.StatusOK, response)
	return
}
