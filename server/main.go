package main

import (
	db "server/system/db"
	server "server/system/server"
)

func main() {
	db.ConnectToDB()
	server.LaunchServer()
	db.StopDb()
}
