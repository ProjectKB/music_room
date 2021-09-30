package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Visibility struct {
	Login       string `bson:"login,omitempty" json:"login,omitempty"`
	Mail        string `bson:"mail,omitempty" json:"mail,omitempty"`
	Preferences string `bson:"preferences,omitempty" json:"preferences,omitempty"`
	Friends     string `bson:"friends,omitempty" json:"friends,omitempty"`
	Avatar      string `bson:"password,omitempty" json:"password,omitempty"`
}

type Friend struct {
	Id        string `bson:"id,omitempty" json:"id,omitempty"`
	Confirmed bool   `bson:"confirmed,omitempty" json:"confirmed,omitempty"`
}

type Notification struct {
	From string `bson:"from,omitempty" json:"from,omitempty"`
	Content string `bson:"content,omitempty" json:"content,omitempty"`
	Readed  bool   `bson:"readed,omitempty" json:"readed,omitempty"`
}

type User struct {
	Id            primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Login         string             `bson:"login,omitempty" json:"login,omitempty"`
	Mail          string             `bson:"mail,omitempty" json:"mail,omitempty"`
	Password      string             `bson:"password,omitempty" json:"password,omitempty"`
	Token         string             `bson:"token,omitempty" json:"token,omitempty"`
	Preferences   []string           `bson:"preferences,omitempty" json:"preferences,omitempty"`
	Friends       []Friend           `bson:"friends,omitempty" json:"friends,omitempty"`
	Events        []string           `bson:"events,omitempty" json:"events,omitempty"`
	Notifications []Notification     `bson:"notifications,omitempty" json:"notifications,omitempty"`
	Visibility    Visibility         `bson:"visibility,omitempty" json:"visibility,omitempty"`
	Avatar        string             `bson:"avatar,omitempty" json:"avatar,omitempty"`
}
