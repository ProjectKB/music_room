package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Event struct {
	Id          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Playlist_id string             `bson:"playlist_id,omitempty" json:"playlist_id,omitempty"`
	Picture     string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Start       string             `bson:"start,omitempty" json:"start,omitempty"`
	End         string             `bson:"end,omitempty" json:"end,omitempty"`
	Location    string             `bson:"location,omitempty" json:"location,omitempty"`
}

// TODO modify typeof start/end
