package controllers

import (
	"context"
	"fmt"
	"log"
	"regexp"
	authorizationController "server/controllers/authorizationController"
	userController "server/controllers/userController"
	"server/helpers"
	"server/model"
	"server/response"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.Playlist, origin string) int {
	var owner_tmp model.User

	default_picture := "path_to_default_picture"
	id, _ := primitive.ObjectIDFromHex(elem.Owner_id)
	filter := bson.D{{"_id", id}}

	if elem.Picture == "" {
		elem.Picture = default_picture
	}

	if elem.Name == "" || (elem.Status != "public" && elem.Status != "private") {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&owner_tmp); err != nil {
		return response.BddError
	} else if err := helpers.CheckPlaylistBlacklistedFields(elem, origin); err != response.Ok {
		return response.Unauthorized
	}

	authorization := model.Authorization{primitive.NewObjectID(), elem.Owner_id, elem.Status, nil}
	elem.Authorization_id = authorization.Id.Hex()

	if err := authorizationController.Create(&authorization); err != response.Ok {
		return err
	} else if _, err := db.PlaylistCollection.InsertOne(context.TODO(), elem); err != nil {
		return response.BddError
	}

	fmt.Println("Playlist Created")

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

func SearchSong(playlistId string, toSearch string, playlist *model.Playlist, songsSearched *[]model.Song) int {
	id, _ := primitive.ObjectIDFromHex(playlistId)
	filter := bson.D{{"_id", id}}

	if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&playlist); err != nil {
		return response.BddError
	}

	regexSong := "(?i).*" + toSearch + ".*"

	for _, song := range playlist.Songs {
		if match, _ := regexp.MatchString(regexSong, song.Name); match {
			*songsSearched = append(*songsSearched, song)
		}
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

	return response.Ok
}

func SearchPlaylist(playlists *[]model.Playlist, toSearch model.Search) int {
	var user model.User

	if res := userController.Read(toSearch.User_id, &user); res != response.Ok {
		return res
	}

	filter := bson.M{"name": bson.M{"$regex": "(?i).*" + toSearch.Query + ".*"}}
	cur, err := db.PlaylistCollection.Find(context.TODO(), filter)

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var playlist model.Playlist
		user_authorized := false

		if err := cur.Decode(&playlist); err != nil {
			return response.BddError
		}

		if !playlist.Has_event {
			if toSearch.Scope == "playlist" && playlist.Status == "private" {
				var authorization model.Authorization

				if res := authorizationController.Read(playlist.Authorization_id, &authorization); res != response.Ok {
					return res
				}

				for i := 0; i < len(authorization.Guests); i++ {
					if authorization.Guests[i].Id == user.Id.Hex() {
						user_authorized = true
					}
				}
			}

			if toSearch.Scope == "playlist" && (toSearch.User_id == playlist.Owner_id || user_authorized) {
				*playlists = append(*playlists, playlist)
			} else if toSearch.Scope == "search" && toSearch.User_id != playlist.Owner_id && playlist.Status != "private" {
				*playlists = append(*playlists, playlist)
			}
		}
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

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
	var playlist model.Playlist

	if err := Read(param, &playlist); err != response.Ok {
		return err
	}

	playlist_id, _ := primitive.ObjectIDFromHex(param)
	authorization_id, _ := primitive.ObjectIDFromHex(playlist.Authorization_id)
	playlist_filter := bson.D{{"_id", playlist_id}}
	authorization_filter := bson.D{{"_id", authorization_id}}

	_, playlist_err := db.PlaylistCollection.DeleteOne(context.TODO(), playlist_filter)
	_, authorization_err := db.AuthorizationCollection.DeleteOne(context.TODO(), authorization_filter)

	if playlist_err != nil || authorization_err != nil {
		return response.BddError
	}

	fmt.Printf("Playlist and Authorization Deleted!\n")

	return response.Ok
}

func DeleteAll() {
	deleteResult, err := db.PlaylistCollection.DeleteMany(context.TODO(), bson.D{{}})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
}

// TODO delete table connected
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
