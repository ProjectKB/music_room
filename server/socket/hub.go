package socket

import (
	"fmt"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

var Usernames = make(map[*websocket.Conn]string)
var NameToConn = make(map[string]*websocket.Conn)

func HandleIncomingMessage(sender *websocket.Conn, msg string) {
	username := strings.TrimSpace(msg)

	// handle first connection
	if _, ok := Usernames[sender]; !ok {

		if username == "" || username == "server" {
			sender.WriteJSON(newError("You have an illegal username."))
			return
		} else if _, ok = NameToConn[username]; ok {
			HandleDisconnection(NameToConn[username])
		}

		sendUserList(sender)

		Usernames[sender] = username
		NameToConn[username] = sender
		m := newMessage(MsgJoin, "server", username)
		m.dispatch()
		return
	}

	// classic msg
	sendChatMessage(sender, msg)
}

func HandleDisconnection(sender *websocket.Conn) {
	username, ok := Usernames[sender]
	if !ok {
		fmt.Println("leave without registering")
		return
	}

	m := newMessage(MsgLeave, "server", username)
	m.dispatch()
	delete(Usernames, sender)
	delete(NameToConn, username)
}

func newError(content string) Message {
	return Message{
		Type:    MsgErr,
		Sender:  "server",
		Content: content,
		Date:    time.Now().UTC(),
		Success: false,
	}
}

func newMessage(msgType MessageType, sender string, content string) Message {
	return Message{
		Type:    msgType,
		Sender:  sender,
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
		Sender:  "",
		Content: list,
		Date:    time.Now().UTC(),
		Success: true,
	}

	_ = who.WriteJSON(m)
}

func sendChatMessage(sender *websocket.Conn, msg string) {
	m := newMessage(MsgChat, Usernames[sender], msg)
	m.dispatch()
}
