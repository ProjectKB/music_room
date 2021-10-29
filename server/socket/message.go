package socket

type MessageType string

const (
	MsgChat                MessageType = "message"
	MsgJoin                MessageType = "join"
	MsgLeave               MessageType = "leave"
	MsgErr                 MessageType = "error"
	MsgFriendShipRequest   MessageType = "friendship request"
	MsgFriendShipConfirmed MessageType = "friendship confirmed"
	MsgUpdateUser          MessageType = "update user"
)

type SocketMessage struct {
	Type    MessageType `bson:"type,omitempty" json:"type,omitempty"`
	Content interface{} `bson:"content,omitempty" json:"content,omitempty"`
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

type FriendShipConfirmed struct {
	Conversations_id string `bson:"conversations_id,omitempty" json:"conversations_id,omitempty"`
	User_id          string `bson:"user_id,omitempty" json:"user_id,omitempty"`
	Friend_id        string `bson:"friend_id,omitempty" json:"friend_id,omitempty"`
	Friend_login     string `bson:"friend_login,omitempty" json:"friend_login,omitempty"`
}

type SocketBody struct {
	Type                MessageType         `bson:"type,omitempty" json:"type,omitempty"`
	MessageChat         MessageFromChat     `bson:"messageFromChat,omitempty" json:"messageFromChat,omitempty"`
	MessageJoin         string              `bson:"messageJoin,omitempty" json:"messageJoin,omitempty"`
	MessageLeave        string              `bson:"messageLeave,omitempty" json:"messageLeave,omitempty"`
	FriendShipRequest   FriendShipRequest   `bson:"friendShipRequest,omitempty" json:"friendShipRequest,omitempty"`
	FriendShipConfirmed FriendShipConfirmed `bson:"friendShipConfirmed,omitempty" json:"friendShipConfirmed,omitempty"`
}
