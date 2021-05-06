package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Login     string             `bson:"login,omitempty" json:"login,omitempty"`
	Mail      string             `bson:"mail,omitempty" json:"mail,omitempty"`
	Password  string             `bson:"password,omitempty" json:"password,omitempty"`
	Friends   []string           `bson:"friends,omitempty" json:"friends,omitempty"` // TODO special routes
	Events    []string           `bson:"events,omitempty" json:"events,omitempty"` // TODO special routes
	Playlists []string           `bson:"playlists,omitempty" json:"playlists,omitempty"` // TODO special routes
	Avatar    string             `bson:"avatar,omitempty" json:"avatar,omitempty"` // TODO automatic default
}

// TODO change omitempty to unrequire for friends, playlists, events
