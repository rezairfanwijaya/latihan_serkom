package wisata

type InputNewWisata struct {
	Nama   string `json:"nama" binding:"required"`
	Gambar string `json:"gambar" binding:"required"`
	Lokasi string `json:"lokasi" binding:"required"`
	Harga  int64  `json:"harga" binding:"required"`
}
