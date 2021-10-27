package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NotificationType string

const (
	FriendshipRequest  NotificationType = "friendship request"
	FriendshipAccepted NotificationType = "friendship accepted"
)

type Notification struct {
	Id      string           `bson:"id,omitempty" json:"id,omitempty"`
	From    string           `bson:"from,omitempty" json:"from,omitempty"`
	Content string           `bson:"content,omitempty" json:"content,omitempty"`
	Type    NotificationType `bson:"type,omitempty" json:"type,omitempty"`
	Readed  bool             `bson:"readed,omitempty" json:"readed,omitempty"`
}

type Notifications struct {
	Id                  primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Login               string             `bson:"login,omitempty" json:"login,omitempty"`
	Notifications       []Notification     `bson:"notifications,omitempty" json:"notifications,omitempty"`
	Notifications_count int                `bson:"notifications_count,omitempty" json:"notifications_count,omitempty"`
}
