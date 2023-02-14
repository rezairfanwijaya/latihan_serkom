package wisata

import "gorm.io/gorm"

type IRepository interface {
	Save(wisata Wisata) (Wisata, error)
	FindAll() ([]Wisata, error)
	FindByID(id int) (Wisata, error)
	FindByNamaWisata(namaWisata string) (Wisata, error)
	Delete(wisata Wisata) error
	Update(wisata Wisata) (Wisata, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{
		db: db,
	}
}

func (r *repository) Save(wisata Wisata) (Wisata, error) {
	if err := r.db.Create(&wisata).Error; err != nil {
		return wisata, err
	}

	return wisata, nil
}

func (r *repository) FindAll() ([]Wisata, error) {
	var wisatas []Wisata
	if err := r.db.Raw("SELECT * from wisata order by id DESC").Scan(&wisatas).Error; err != nil {
		return wisatas, err
	}

	return wisatas, nil
}

func (r *repository) FindByID(id int) (Wisata, error) {
	var wisata Wisata
	if err := r.db.Where("id = ?", id).Find(&wisata).Error; err != nil {
		return wisata, err
	}

	return wisata, nil
}

func (r *repository) Delete(wisata Wisata) error {
	if err := r.db.Delete(&wisata).Error; err != nil {
		return err
	}

	return nil
}

func (r *repository) Update(wisata Wisata) (Wisata, error) {
	if err := r.db.Save(&wisata).Error; err != nil {
		return wisata, err
	}

	return wisata, nil
}

func (r *repository) FindByNamaWisata(namaWisata string) (Wisata, error) {
	var wisata Wisata
	if err := r.db.Where("nama = ?", namaWisata).Find(&wisata).Error; err != nil {
		return wisata, err
	}

	return wisata, nil
}
