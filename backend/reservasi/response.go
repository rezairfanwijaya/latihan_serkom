package reservasi

type TotalPengunjung struct {
	TotalPengunjungDewasa int `json:"total_pengunjung_dewasa"`
	TotalPengunjungAnak   int `json:"total_pengunjung_anak"`
}
