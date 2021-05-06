package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Authorization struct {
	Id           primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Owner_id     string             `bson:"owner_id,omitempty" json:"owner_id,omitempty"` // TODO add owner when created (dependant of session)
	Status       string             `bson:"status,omitempty" json:"status,omitempty"`
	Guests       []string           `bson:"guests,omitempty" json:"guests,omitempty"`             // TODO special route
	Contributors []string           `bson:"contributors,omitempty" json:"contributors,omitempty"` // TODO special route
}
