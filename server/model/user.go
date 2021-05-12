package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Login     string             `bson:"login,omitempty" json:"login,omitempty"`
	Mail      string             `bson:"mail,omitempty" json:"mail,omitempty"`
	Password  string             `bson:"password,omitempty" json:"password,omitempty"`
	Friends   []string           `bson:"friends,omitempty" json:"friends,omitempty"`
	Events    []string           `bson:"events,omitempty" json:"events,omitempty"`
	Playlists []string           `bson:"playlists,omitempty" json:"playlists,omitempty"`
	Avatar    string             `bson:"avatar,omitempty" json:"avatar,omitempty"`
}

// TODO add musical preference (create/update)
