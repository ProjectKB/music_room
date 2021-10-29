package socket

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func WebsocketConnection(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	var socket_body SocketBody

	if err != nil {
		_, _ = fmt.Fprint(w, "You must use the web socket protocol to connect to this endpoint.", err)
		return
	}

	defer ws.Close()

	socket_functions := map[MessageType]func(){
		MsgJoin: func() {
			HandleFirstConnection(ws, socket_body.MessageJoin)
		},
		MsgLeave: func() {
			HandleDisconnection(NameToConn[strings.Trim(socket_body.MessageLeave, "\"")])
		},
		MsgChat: func() {
			HandleIncomingMessage(ws, socket_body.MessageChat)
		},
		MsgFriendShipRequest: func() {
			HandleFriendshipRequest(ws, socket_body.FriendShipRequest)
		},
		MsgFriendShipConfirmed: func() {
			HandleFriendshipConfirmed(ws, socket_body.FriendShipConfirmed)
		},
	}

	for {
		_, p, err := ws.ReadMessage()
		if err != nil {
			HandleDisconnection(ws)
			break
		}

		byteReader := bytes.NewReader(p)
		
		json.NewDecoder(byteReader).Decode(&socket_body)
		socket_functions[socket_body.Type]()
	}
}
