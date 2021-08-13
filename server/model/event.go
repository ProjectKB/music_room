package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Event struct {
	Id          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string             `bson:"name,omitempty" json:"name,omitempty"`
	Owner_id    string             `bson:"owner_id,omitempty" json:"owner_id,omitempty"` // TODO along creation -> session
	Playlist_id string             `bson:"playlist_id,omitempty" json:"playlist_id,omitempty"`
	Picture     string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Private     bool               `bson:"private,false" json:"private,false"`
	Status      string             `bson:"status,omitempty" json:"status,omitempty"`
}

type EventSearch struct {
	Pending  []Event `bson:"pending,omitempty" json:"pending,omitempty"`
	Ongoing  []Event `bson:"ongoing,omitempty" json:"ongoing,omitempty"`
	Finished []Event `bson:"finished,omitempty" json:"finished,omitempty"`
}

// TODO ADD MSG FOR FLASH MSG (FRONT)
// TODO modify typeof start/end
// TODO START END -> Add status field [pending, inGoing, ended]
