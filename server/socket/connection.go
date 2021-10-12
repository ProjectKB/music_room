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
	var message MessageFromChat

	if err != nil {
		_, _ = fmt.Fprint(w, "You must use the web socket protocol to connect to this endpoint.", err)
		return
	}

	defer ws.Close()

	for {
		data_type, p, err := ws.ReadMessage()
		if err != nil {
			HandleDisconnection(ws)
			break
		} else if data_type == 1 {
			user_login := string(p)

			HandleDisconnection(NameToConn[strings.Trim(user_login, "\"")])
			break
		}

		byteReader := bytes.NewReader(p)
		json.NewDecoder(byteReader).Decode(&message)

		HandleIncomingMessage(ws, message)
	}
}
