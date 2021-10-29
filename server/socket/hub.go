package socket

import (
	"context"
	"fmt"
	"server/model"
	"server/response"
	"time"

	notificationController "server/controllers/notificationController"
	// userController "server/controllers/userController"
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

	m := sendUserList()
	m.dispatch()

	delete(Usernames, sender)
	delete(NameToConn, username)
}

func HandleFriendshipRequest(sender *websocket.Conn, request FriendShipRequest) {
	new_notification := model.Notification{primitive.NewObjectID().Hex(), request.Sender_id, fmt.Sprintf("%s wants to be your friend!", Usernames[sender]), model.FriendshipRequest, false}

	if err := notificationController.SendFriendShipRequest(request.Conversations_id, request.Sender_id, &new_notification); err != response.Ok {
		sender.WriteJSON(newError(response.ErrorMessages[err]))
		return
	} else if receiverNameToConn, ok := NameToConn[request.Receiver_login]; ok {
		m := SocketMessage{
			Type:    MsgFriendShipRequest,
			Content: new_notification,
		}

		receiverNameToConn.WriteJSON(m)
	}
}

func HandleFriendshipConfirmed(sender *websocket.Conn, request FriendShipConfirmed) {
	new_notification := model.Notification{primitive.NewObjectID().Hex(), request.User_id, fmt.Sprintf("%s has accepted your invitation!", Usernames[sender]), model.FriendshipConfirmed, false}
	user_new_friend := model.Friend{request.Friend_id, true, ""}
	friend_new_friend := model.Friend{request.User_id, true, ""}

	// if err := userController.ConfirmFriend(request.User_id, user_new_friend); err == response.Unauthorized {
	// 	sender.WriteJSON(newError("You have already accepted this friendship!"))
	// 	return
	// } else if err != response.Ok {
	// 	sender.WriteJSON(newError("Something went wrong. Try later!"))
	// 	return
	// } else if err := notificationController.SendFriendShipConfirmed(request.Conversations_id, request.User_id, &new_notification); err != response.Ok {
	// 	sender.WriteJSON(newError(response.ErrorMessages[err]))
	// 	return
	// }

	sender.WriteJSON(SocketMessage{
		Type:    MsgUpdateUser,
		Content: user_new_friend,
	})

	if receiverNameToConn, ok := NameToConn[request.Friend_login]; ok {
		receiverNameToConn.WriteJSON(SocketMessage{
			Type:    MsgFriendShipConfirmed,
			Content: new_notification,
		})

		receiverNameToConn.WriteJSON(SocketMessage{
			Type:    MsgUpdateUser,
			Content: friend_new_friend,
		})
	}
}

func newError(content string) SocketMessage {
	return SocketMessage{
		Type:    MsgErr,
		Content: content,
	}
}

func (m SocketMessage) dispatch() {
	for client := range Usernames {
		_ = client.WriteJSON(m)
	}
}

func sendUserList() SocketMessage {
	list := []string{}
	for _, username := range Usernames {
		list = append(list, username)
	}

	return SocketMessage{
		Type:    MsgJoin,
		Content: list,
	}
}

func sendChatMessage(sender *websocket.Conn, msg MessageFromChat) {
	if msg.Content != "" {
		message := model.Message{
			From:    Usernames[sender],
			To:      msg.To,
			Content: msg.Content,
			Date:    time.Now().UTC(),
			Success: true,
		}

		socket_message := SocketMessage{
			Type:    MsgChat,
			Content: message,
		}

		if err := addMessageToConversation(msg.Conversation_id, message); err != response.Ok {
			sender.WriteJSON(newError("Something went wrong with your message."))
			return
		}

		sender.WriteJSON(socket_message)

		if receiverNameToConn, ok := NameToConn[msg.To]; ok {
			receiverNameToConn.WriteJSON(socket_message)
		}
	}
}

func addMessageToConversation(conversation_id string, msg model.Message) int {
	id, _ := primitive.ObjectIDFromHex(conversation_id)
	filter := bson.D{{"_id", id}}
	var conversation model.Conversation

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
