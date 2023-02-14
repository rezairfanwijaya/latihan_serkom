package admin

import "errors"

type IService interface {
	Login(input InputAdmin) (Admin, error)
}

type service struct {
	repoAdmin IRepository
}

func NewService(repoAdmin IRepository) *service {
	return &service{
		repoAdmin: repoAdmin,
	}
}

func (s *service) Login(input InputAdmin) (Admin, error) {
	adminByEmail, err := s.repoAdmin.GetByEmail(input.Email)
	if err != nil {
		return adminByEmail, err
	}

	if adminByEmail.ID == 0 {
		return adminByEmail, errors.New("email not found")
	}

	if adminByEmail.Password != input.Password {
		return adminByEmail, errors.New("wrong password")
	}

	return adminByEmail, nil
}
