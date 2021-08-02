package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Search struct {
	Query   string `bson:"query,omitempty" json:"query,omitempty"`
	Scope   string `bson:"scope,omitempty" json:"scope,omitempty"`
	User_id string `bson:"user_id,omitempty" json:"user_id,omitempty"`
}

type Song struct {
	Id    string `bson:"id,omitempty" json:"id,omitempty"`
	Name  string `bson:"name,omitempty" json:"name,omitempty"`
	Score uint   `bson:"score,omitempty" json:"score,omitempty"` // TODO sort algo
}

type Guest struct {
	Id          string `bson:"id,omitempty" json:"id,omitempty"`
	Contributor bool   `bson:"contributor,omitempty" json:"contributor,omitempty"`
}

type Playlist struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string             `bson:"name,omitempty" json:"name,omitempty"`
	Owner_id  string             `bson:"owner_id,omitempty" json:"owner_id,omitempty"`
	Status    string             `bson:"status,omitempty" json:"status,omitempty"`
	Songs     []Song             `bson:"songs,omitempty" json:"songs,omitempty"`
	Guests    []Guest            `bson:"guests,omitempty" json:"guests,omitempty"`
	Picture   string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Has_event bool               `bson:"has_event,omitempty" json:"has_event,omitempty"`
}
