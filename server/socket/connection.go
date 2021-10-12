package socket

import (
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
		}

		msg := string(p)

		if data_type == 2 {
			HandleDisconnection(NameToConn[strings.Trim(msg, "\"")])
			break
		}

		HandleIncomingMessage(ws, msg)
	}
}
