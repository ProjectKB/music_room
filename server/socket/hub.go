package socket

import (
	"fmt"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

var Usernames = make(map[*websocket.Conn]string)
var NameToConn = make(map[string]*websocket.Conn)

func HandleIncomingMessage(sender *websocket.Conn, msg MessageFromChat) {

	// handle first connection
	if _, ok := Usernames[sender]; !ok {
		username := strings.TrimSpace(msg.Content)

		if username == "" || username == "server" {
			sender.WriteJSON(newError("You have an illegal username."))
			return
		} else if _, ok = NameToConn[username]; ok {
			HandleDisconnection(NameToConn[username])
		}

		sendUserList(sender)

		Usernames[sender] = username
		NameToConn[username] = sender
		m := newMessage(MsgJoin, "server", "client", username)
		m.dispatch()
		return
	}

	// classic msg
	sendChatMessage(sender, msg.To, msg.Content)
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

func sendUserList(who *websocket.Conn) {
	list := []string{}
	for _, username := range Usernames {
		list = append(list, username)
	}

	m := Message{
		Type:    MsgUserList,
		From:    "server",
		To:      "client",
		Content: list,
		Date:    time.Now().UTC(),
		Success: true,
	}

	_ = who.WriteJSON(m)
}

func sendChatMessage(sender *websocket.Conn, receiver string, msg string) {
	if msg != "" {

		m := newMessage(MsgChat, Usernames[sender], receiver, msg)
		m.dispatch()

		// if receiver connected send to him to + add msg to conversation

	}
}
