package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Guest struct {
	Id          string `bson:"id,omitempty" json:"id,omitempty"`
	Name        string `bson:"name,omitempty" json:"name,omitempty"`
	Contributor bool   `bson:"contributor,omitempty" json:"contributor,omitempty"`
}

type Authorization struct {
	Id       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Owner_id string             `bson:"owner_id,omitempty" json:"owner_id,omitempty"`
	Status   string             `bson:"status,omitempty" json:"status,omitempty"`
	Guests   []Guest            `bson:"guests,omitempty" json:"guests,omitempty"`
}
