package wisata

import "errors"

type IService interface {
	SaveWisata(input InputNewWisata) (Wisata, error)
	GetAllWisata() ([]Wisata, error)
	GetByID(id int) (Wisata, error)
	GetByName(name string) (Wisata, error)
	DeleteWisata(id int) error
	UpdateWisata(input InputNewWisata, id int) (Wisata, error)
}

type service struct {
	repoWisata IRepository
}

func NewService(repoWisata IRepository) *service {
	return &service{
		repoWisata: repoWisata,
	}
}

func (s *service) SaveWisata(input InputNewWisata) (Wisata, error) {
	var wisata Wisata
	wisata.Gambar = input.Gambar
	wisata.Harga = input.Harga
	wisata.Lokasi = input.Lokasi
	wisata.Nama = input.Nama

	newWisata, err := s.repoWisata.Save(wisata)
	if err != nil {
		return newWisata, err
	}

	return newWisata, nil
}

func (s *service) GetAllWisata() ([]Wisata, error) {
	wisatas, err := s.repoWisata.FindAll()
	if err != nil {
		return wisatas, err
	}

	return wisatas, nil
}

func (s *service) DeleteWisata(id int) error {
	wisataById, err := s.repoWisata.FindByID(id)
	if err != nil {
		return err
	}

	if wisataById.ID == 0 {
		return errors.New("wisata tidak ditemukan")
	}

	if err := s.repoWisata.Delete(wisataById); err != nil {
		return err
	}

	return nil
}

func (s *service) GetByID(id int) (Wisata, error) {
	wisataById, err := s.repoWisata.FindByID(id)
	if err != nil {
		return wisataById, err
	}

	if wisataById.ID == 0 {
		return wisataById, errors.New("wisata tidak ditemukan")
	}

	return wisataById, nil
}

func (s *service) UpdateWisata(input InputNewWisata, id int) (Wisata, error) {
	wisataById, err := s.repoWisata.FindByID(id)
	if err != nil {
		return wisataById, err
	}

	if wisataById.ID == 0 {
		return wisataById, errors.New("wisata tidak ditemukan")
	}

	wisataById.Gambar = input.Gambar
	wisataById.Harga = input.Harga
	wisataById.Lokasi = input.Lokasi
	wisataById.Nama = input.Nama

	wisataUpdated, err := s.repoWisata.Update(wisataById)
	if err != nil {
		return wisataUpdated, err
	}

	return wisataUpdated, nil
}

func (s *service) GetByName(name string) (Wisata, error) {
	wisataByName, err := s.repoWisata.FindByNamaWisata(name)
	if err != nil {
		return wisataByName, err
	}

	if wisataByName.ID == 0 {
		return wisataByName, errors.New("wisata tidak ditemukan")
	}

	return wisataByName, nil
}
