package main

import (
	// authorizationController "server/controllers/authorizationController"
	// eventController "server/controllers/eventController"

	// playlistController "server/controllers/playlistController"
	// userController "server/controllers/userController"
	// "server/model"
	db "server/system/db"
	server "server/system/server"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

func main() {

	db.ConnectToDB()
	// userController.Create(&model.User{primitive.NewObjectID(), "Xamarin", "lalalolali", nil, nil, nil, ""})
	// playlistController.Create(&model.Playlist{primitive.NewObjectID(), "Xamarin", "lalalolali", []model.Song{model.Song{"titles", 28}}, ""})
	// eventController.Create(&model.Event{primitive.NewObjectID(), "Xamarin", "lalalolali", "STRAT", "END", ""})
	// authorizationController.Create(&model.Authorization{primitive.NewObjectID(), "Bichoco", nil, nil})
	server.LaunchServer()
	db.StopDb()
}
