package socket

import (
	"context"
	"fmt"
	"server/response"
	"time"

	db "server/system/db"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var Usernames = make(map[*websocket.Conn]string)
var NameToConn = make(map[string]*websocket.Conn)

func HandleIncomingMessage(sender *websocket.Conn, msg MessageFromChat) {
	sendChatMessage(sender, msg)
}

func HandleFirstConnection(sender *websocket.Conn, username string) {
	if username == "" || username == "server" {
		sender.WriteJSON(newError("You have an illegal username."))
		return
	} else if _, ok := NameToConn[username]; ok {
		HandleDisconnection(NameToConn[username])
	}

	Usernames[sender] = username
	NameToConn[username] = sender

	m := sendUserList()
	m.dispatch()
}

func HandleDisconnection(sender *websocket.Conn) {
	username, ok := Usernames[sender]
	if !ok {
		fmt.Println("leave without registering")
		return
	}

	m := newMessage(MsgLeave, "server", "client", username)
	m.dispatch()
	delete(Usernames, sender)
	delete(NameToConn, username)
}

func newError(content string) Message {
	return Message{
		Type:    MsgErr,
		From:    "server",
		To:      "client",
		Content: content,
		Date:    time.Now().UTC(),
		Success: false,
	}
}

func newMessage(msgType MessageType, sender string, receiver string, content string) Message {
	return Message{
		Type:    msgType,
		From:    sender,
		To:      receiver,
		Content: content,
		Date:    time.Now().UTC(),
		Success: true,
	}
}

func (m Message) dispatch() {
	for client := range Usernames {
		_ = client.WriteJSON(m)
	}
}

func sendUserList() Message {
	list := []string{}
	for _, username := range Usernames {
		list = append(list, username)
	}

	return Message{
		Type:    MsgJoin,
		From:    "server",
		To:      "client",
		Content: list,
		Date:    time.Now().UTC(),
		Success: true,
	}
}

func sendChatMessage(sender *websocket.Conn, msg MessageFromChat) {
	if msg.Content != "" {

		m := newMessage(MsgChat, Usernames[sender], msg.To, msg.Content)
		sender.WriteJSON(m)

		if receiverNameToConn, ok := NameToConn[msg.To]; ok {
			receiverNameToConn.WriteJSON(m)
		}

		if err := addMessageToConversation(msg.Conversation_id, m); err != response.Ok {
			sender.WriteJSON(newError("Something went wrong with your message."))
		}
	}
}

func addMessageToConversation(conversation_id string, msg Message) int {
	id, _ := primitive.ObjectIDFromHex(conversation_id)
	filter := bson.D{{"_id", id}}
	var conversation Conversation

	if err := db.ConversationCollection.FindOne(context.TODO(), filter).Decode(&conversation); err != nil {
		return response.BddError
	}

	update := bson.M{
		"$set": bson.D{
			{"messages", append(conversation.Messages, msg)},
		},
	}

	if _, err := db.ConversationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}
