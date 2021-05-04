package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Authorization struct {
	Id           primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Status       string             `bson:"status,omitempty" json:"status,omitempty"`
	Guests       []string           `bson:"guests,omitempty" json:"guests,omitempty"`
	Contributors []string           `bson:"contributors,omitempty" json:"contributors,omitempty"`
}
