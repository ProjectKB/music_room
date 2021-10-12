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
	MsgUserList MessageType = "users"
)

type Message struct {
	Type    MessageType `bson:"type,omitempty" json:"type,omitempty"`
	Sender  string      `bson:"sender,omitempty" json:"sender,omitempty"`
	Content interface{} `bson:"content,omitempty" json:"content,omitempty"`
	Date    time.Time   `bson:"date,omitempty" json:"date,omitempty"`
	Success bool        `bson:"success,omitempty" json:"success,omitempty"`
}

type Conversation struct {
	Id           primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Messages     []Message          `bson:"messages,omitempty" json:"messages,omitempty"`
	Last_message time.Time          `bson:"last_message,omitempty" json:"last_message,omitempty"`
}
