package socket

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MessageType string

const (
	MsgChat     MessageType = "message"
	MsgJoin     MessageType = "join"
	MsgLeave    MessageType = "leave"
	MsgErr      MessageType = "error"
)

type Message struct {
	Type    MessageType `bson:"type,omitempty" json:"type,omitempty"`
	From    string      `bson:"from,omitempty" json:"from,omitempty"`
	To      string      `bson:"to,omitempty" json:"to,omitempty"`
	Content interface{} `bson:"content,omitempty" json:"content,omitempty"`
	Date    time.Time   `bson:"date,omitempty" json:"date,omitempty"`
	Success bool        `bson:"success,omitempty" json:"success,omitempty"`
}

type Conversation struct {
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserNameA string             `bson:"user_a,omitempty" json:"user_a,omitempty"`
	UserNameB string             `bson:"user_b,omitempty" json:"user_b,omitempty"`
	Messages  []Message          `bson:"messages,omitempty" json:"messages,omitempty"`
}

type MessageFromChat struct {
	To              string `bson:"to,omitempty" json:"to,omitempty"`
	Content         string `bson:"content,omitempty" json:"content,omitempty"`
	Conversation_id string `bson:"conversation_id,omitempty" json:"conversation_id,omitempty"`
}
