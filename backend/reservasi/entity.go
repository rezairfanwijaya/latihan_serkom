package reservasi

import "time"

type Reservasi struct {
	ID               int       `json:"id" gorm:"primaryKey"`
	NamaLengkap      string    `json:"nama_lengkap"`
	NomorIdentitas   string    `json:"nomor_identitas"`
	NomorHP          string    `json:"nomor_hp"`
	TempatWisata     string    `json:"tempat_wisata"`
	TanggalKunjungan time.Time `json:"tanggal_kunjungan"`
	PengunjungDewasa int       `json:"pengunjung_dewasa"`
	PengunjungAnak   int       `json:"pengunjung_anak"`
	HargaTiket       int       `json:"harga_tiket"`
	TotalBayar       int       `json:"total_bayar"`
}
