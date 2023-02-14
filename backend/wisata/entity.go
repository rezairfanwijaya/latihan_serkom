package wisata

type Wisata struct {
	ID     int    `json:"id" gorm:"primaryKey"`
	Nama   string `json:"nama"`
	Gambar string `json:"gambar"`
	Lokasi string `json:"lokasi"`
	Harga  int64  `json:"harga"`
}

// binding:"required
// binding:"required
// binding:"required
