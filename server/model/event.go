package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Event struct {
	Id          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string             `bson:"name,omitempty" json:"name,omitempty"`
	Playlist_id string             `bson:"playlist_id,omitempty" json:"playlist_id,omitempty"` // special road
	Picture     string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Start       string             `bson:"start,omitempty" json:"start,omitempty"` // TODO what is happening when started/ended
	End         string             `bson:"end,omitempty" json:"end,omitempty"`     // TODO what is happening when started/ended
	// Location    string             `bson:"location,omitempty" json:"location,omitempty"` // TODO bonus
}

// TODO modify typeof start/end
// TODO START END -> Add status field [pending, inGoing, ended]
