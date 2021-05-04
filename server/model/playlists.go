package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Song struct {
	Id    string `bson:"id,omitempty" json:"id,omitempty"`
	Score int    `bson:"score,omitempty" json:"score,omitempty"`
}

type Playlist struct {
	Id               primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Owner_id         string             `bson:"owner_id,omitempty" json:"owner_id,omitempty"`
	Authorization_id string             `bson:"authorization_id,omitempty" json:"authorization_id,omitempty"`
	Songs            []Song             `bson:"songs,omitempty" json:"songs,omitempty"`
	Picture          string             `bson:"picture,omitempty" json:"picture,omitempty"`
}
