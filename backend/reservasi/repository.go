package reservasi

import "gorm.io/gorm"

type IRepository interface {
	Save(reservasi Reservasi) error
	FindAll() ([]Reservasi, error)
	GetTotalPengunjung() (TotalPengunjung, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db: db}
}

func (r *repository) Save(reservasi Reservasi) error {
	if err := r.db.Create(&reservasi).Error; err != nil {
		return err
	}
	return nil
}

func (r *repository) FindAll() ([]Reservasi, error) {
	var reservasis []Reservasi
	if err := r.db.Find(&reservasis).Error; err != nil {
		return reservasis, err
	}

	return reservasis, nil
}

func (r *repository) GetTotalPengunjung() (TotalPengunjung, error) {
	var totalPengunjung TotalPengunjung
	
	if err := r.db.Raw("SELECT SUM(pengunjung_dewasa) as total_pengunjung_dewasa, SUM(pengunjung_anak) as total_pengunjung_anak FROM reservasis").Scan(&totalPengunjung).Error; err != nil {
		return totalPengunjung, err
	}

	return totalPengunjung, nil
}
