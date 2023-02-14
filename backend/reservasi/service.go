package reservasi

import (
	"time"
)

type IService interface {
	CreateReservasi(input InputNewReservasi) error
	GetTotalPengunjung() (TotalPengunjung, error)
}

type service struct {
	repoReservasi IRepository
}

func NewService(repoReservasi IRepository) *service {
	return &service{
		repoReservasi: repoReservasi,
	}
}

func (s *service) CreateReservasi(input InputNewReservasi) error {
	var reservasi Reservasi

	reservasi.HargaTiket = input.HargaTiket
	reservasi.NamaLengkap = input.NamaLengkap
	reservasi.NomorHP = input.NomorHP
	reservasi.NomorIdentitas = input.NomorIdentitas
	reservasi.PengunjungAnak = input.PengunjungAnak
	reservasi.TotalBayar = input.TotalBayar
	reservasi.TempatWisata = input.TempatWisata
	reservasi.PengunjungDewasa = input.PengunjungDewasa

	date, err := time.Parse("2006-01-02", input.TanggalKunjungan)
	if err != nil {
		return err
	}

	reservasi.TanggalKunjungan = date
	if err := s.repoReservasi.Save(reservasi); err != nil {
		return err
	}

	return nil
}

func (s *service) GetTotalPengunjung() (TotalPengunjung, error) {
	totalPengunjung, err := s.repoReservasi.GetTotalPengunjung()
	if err != nil {
		return totalPengunjung, err
	}

	return totalPengunjung, nil

}
