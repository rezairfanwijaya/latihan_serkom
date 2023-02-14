package handler

import (
	"net/http"
	"serkom/helper"
	"serkom/wisata"
	"strconv"

	"github.com/gin-gonic/gin"
)

type handlerWisata struct {
	serviceWisata wisata.IService
}

func NewHandlerWisata(serviceWisata wisata.IService) *handlerWisata {
	return &handlerWisata{
		serviceWisata: serviceWisata,
	}
}

func (h *handlerWisata) SaveWisata(c *gin.Context) {
	var input wisata.InputNewWisata

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

	// panggil service
	newWisata, err := h.serviceWisata.SaveWisata(input)
	if err != nil {
		response := helper.ResponseAPI(
			"error",
			"gagal simpan wisata",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"berhasil menyimpan wisata",
		http.StatusOK,
		newWisata,
	)

	c.JSON(http.StatusOK, response)
}

func (h *handlerWisata) GetAllWisata(c *gin.Context) {
	wisatas, err := h.serviceWisata.GetAllWisata()
	if err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal mengambil wisata",
			http.StatusInternalServerError,
			err.Error(),
		)

		c.JSON(http.StatusInternalServerError, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"berhasil mendapatkan wisata",
		http.StatusOK,
		wisatas,
	)

	c.JSON(http.StatusOK, response)
}

func (h *handlerWisata) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, _ := strconv.Atoi(idParam)

	wisataById, err := h.serviceWisata.GetByID(id)
	if err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal mengambil wisata",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"berhasil mengambil wisata",
		http.StatusOK,
		wisataById,
	)

	c.JSON(http.StatusOK, response)
}

func (h *handlerWisata) DeleteWisata(c *gin.Context) {
	idParam := c.Param("id")
	id, _ := strconv.Atoi(idParam)

	if err := h.serviceWisata.DeleteWisata(id); err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal menghapus wisata",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"berhasil menghapus wisata",
		http.StatusOK,
		nil,
	)

	c.JSON(http.StatusOK, response)
}

func (h *handlerWisata) UpdateWisata(c *gin.Context) {
	idParam := c.Param("id")
	id, _ := strconv.Atoi(idParam)

	var input wisata.InputNewWisata

	if err := c.BindJSON(&input); err != nil {
		errBinding := helper.FormatErrorBinding(err)
		response := helper.ResponseAPI(
			"gagal",
			"gagal update wisata",
			http.StatusBadRequest,
			errBinding,
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	wisataUpdated, err := h.serviceWisata.UpdateWisata(input, id)
	if err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal update wisata",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"sukses update wisata",
		http.StatusOK,
		wisataUpdated,
	)

	c.JSON(http.StatusOK, response)
	return
}

func (h *handlerWisata) GetByName(c *gin.Context) {
	name := c.Param("name")

	wisataById, err := h.serviceWisata.GetByName(name)
	if err != nil {
		response := helper.ResponseAPI(
			"gagal",
			"gagal mengambil wisata",
			http.StatusBadRequest,
			err.Error(),
		)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := helper.ResponseAPI(
		"sukses",
		"berhasil mengambil wisata",
		http.StatusOK,
		wisataById,
	)

	c.JSON(http.StatusOK, response)
}
