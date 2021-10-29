package socket

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MessageType string

const (
	MsgChat              MessageType = "message"
	MsgJoin              MessageType = "join"
	MsgLeave             MessageType = "leave"
	MsgErr               MessageType = "error"
	MsgFriendShipRequest MessageType = "friendship request"
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

type FriendShipRequest struct {
	Conversations_id string `bson:"conversations_id,omitempty" json:"conversations_id,omitempty"`
	Sender_id        string `bson:"sender_id,omitempty" json:"sender_id,omitempty"`
	Receiver_login   string `bson:"receiver_login,omitempty" json:"receiver_login,omitempty"`
}

type SocketBody struct {
	Type              MessageType       `bson:"type,omitempty" json:"type,omitempty"`
	MessageChat       MessageFromChat   `bson:"messageFromChat,omitempty" json:"messageFromChat,omitempty"`
	MessageJoin       string            `bson:"messageJoin,omitempty" json:"messageJoin,omitempty"`
	MessageLeave      string            `bson:"messageLeave,omitempty" json:"messageLeave,omitempty"`
	FriendShipRequest FriendShipRequest `bson:"friendShipRequest,omitempty" json:"friendShipRequest,omitempty"`
}

type SocketAPIError struct {
	Type    MessageType `bson:"type,omitempty" json:"type,omitempty"`
	Content string      `bson:"content,omitempty" json:"content,omitempty"`
}
