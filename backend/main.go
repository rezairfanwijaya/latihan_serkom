package main

import (
	"log"
	"serkom/admin"
	"serkom/database"
	"serkom/handler"
	"serkom/reservasi"
	"serkom/wisata"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// db connection
	connection, err := database.GetConnection(".env")
	if err != nil {
		log.Fatal(err)
	}

	repoWisata := wisata.NewRepository(connection)
	serviceWisata := wisata.NewService(repoWisata)
	handlerWisata := handler.NewHandlerWisata(serviceWisata)

	repoReservasi := reservasi.NewRepository(connection)
	serviceReservasi := reservasi.NewService(repoReservasi)
	handlerReservasi := handler.NewHandlerReservasi(serviceReservasi)

	repoAdmin := admin.NewRepository(connection)
	serviceAdmin := admin.NewService(repoAdmin)
	handlerAdmin := handler.NewHandlerAdmin(serviceAdmin)

	r := gin.Default()
	r.Use(cors.Default())

	// wisata
	r.POST("/wisata", handlerWisata.SaveWisata)
	r.GET("/wisata", handlerWisata.GetAllWisata)
	r.GET("/wisata/:id", handlerWisata.GetByID)
	r.GET("/wisatas/:name", handlerWisata.GetByName)
	r.PUT("/wisata/:id", handlerWisata.UpdateWisata)
	r.DELETE("/wisata/:id", handlerWisata.DeleteWisata)

	// reservasi
	r.POST("/reservasi", handlerReservasi.SaveReservasi)
	r.GET("/reservasi", handlerReservasi.GetAllReservasis)
	r.GET("/reservasi/statistik", handlerReservasi.GetStatistikPengunjung)

	r.POST("/login", handlerAdmin.Login)

	if err := r.Run("localhost:4444"); err != nil {
		log.Fatal(err)
	}
}
