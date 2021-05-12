package controllers

import (
	"context"
	"fmt"
	"log"
	authorizationController "server/controllers/authorizationController"
	"server/model"
	"server/response"
	"server/helpers"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.Playlist) int {
	default_picture := "path_to_default_picture"
	authorization := model.Authorization{primitive.NewObjectID(), elem.Owner_id, "public", nil}

	if elem.Picture == "" {
		elem.Picture = default_picture
	}

	elem.Authorization_id = authorization.Id.String()

	if elem.Name == "" {
		return response.FieldIsMissing
	} else if fieldErr := helpers.CheckPlaylistBlacklistedFields(elem); fieldErr != response.Ok {
		return response.Unauthorized
	} else if authErr := authorizationController.Create(&authorization); authErr != response.Ok {
		return authErr
	} else if _, err := db.PlaylistCollection.InsertOne(context.TODO(), elem); err != nil {
		return response.BddError
	}

	fmt.Println("Inserted a single document")
	return response.Ok
}

func Read(param string, result *model.Playlist) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadAll(playlists *[]model.Playlist) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.PlaylistCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Playlist

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*playlists = append(*playlists, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return response.Ok
}

func Update(fields bson.M, param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": fields,
	}

	updateResult, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return response.Ok
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.PlaylistCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
	return response.Ok
}

func DeleteAll() {
	deleteResult, err := db.PlaylistCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
}

func AddSong(playlistId string, song *model.Song) int {
	id, _ := primitive.ObjectIDFromHex(playlistId)
	filter := bson.D{{"_id", id}}
	var playlist model.Playlist

	if song.Id == "" || song.Name == "" {
		return response.FieldIsMissing
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&playlist); err != nil {
		return response.BddError
	} else if song.Score != 0 {
		return response.Unauthorized
	}

	// TODO check how to secure when song id doesn't exist

	for i := 0; i < len(playlist.Songs); i++ {
		if playlist.Songs[i].Id == song.Id {
			return response.AlreadyExist
		}
	}

	playlist.Songs = append(playlist.Songs, *song)

	update := bson.M{
		"$set": bson.D{
			{"songs", playlist.Songs},
		},
	}

	if _, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func RemoveSong(playlistId string, song *model.Song) int {
	id, _ := primitive.ObjectIDFromHex(playlistId)
	filter := bson.D{{"_id", id}}
	var playlist model.Playlist
	songExist := false

	if song.Id == "" {
		return response.FieldIsMissing
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&playlist); err != nil {
		return response.BddError
	} else if song.Score != 0 {
		return response.Unauthorized
	}

	// TODO check how to secure when song id doesn't exist

	for i := 0; i < len(playlist.Songs); i++ {
		if playlist.Songs[i].Id == song.Id {
			songExist = true
			playlist.Songs = append(playlist.Songs[:i], playlist.Songs[i+1:]...)
		}
	}

	if !songExist {
		return response.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"songs", playlist.Songs},
		},
	}

	if _, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}
