package models

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	CreatedAt time.Time
}

type Product struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Description string
	Price       float64 `gorm:"not null"`
	CreatedAt   time.Time
}
type Request struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Date        string `gorm:"not null"`
	EvidenceURL string `gorm:"not null"`
	Status      string `gorm:"default:pending"` // pending, approved, rejected
}