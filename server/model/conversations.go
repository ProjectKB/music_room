package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Conversation struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserNameA string             `bson:"user_a,omitempty" json:"user_a,omitempty"`
	UserNameB string             `bson:"user_b,omitempty" json:"user_b,omitempty"`
	Messages  []Message          `bson:"messages,omitempty" json:"messages,omitempty"`
}

type Message struct {
	From    string    `bson:"from,omitempty" json:"from,omitempty"`
	To      string    `bson:"to,omitempty" json:"to,omitempty"`
	Content string    `bson:"content,omitempty" json:"content,omitempty"`
	Date    time.Time `bson:"date,omitempty" json:"date,omitempty"`
	Success bool      `bson:"success,omitempty" json:"success,omitempty"`
}