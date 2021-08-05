package controllers

import (
	"context"
	"fmt"
	"log"
	"regexp"
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
	} else if toSearch.Scope != "playlist" && toSearch.Scope != "search" && toSearch.Scope != "picker" {
		return response.Unauthorized
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
			if toSearch.Scope == "playlist" {
				for i := 0; i < len(playlist.Guests); i++ {
					if playlist.Guests[i].Id == user.Id.Hex() {
						user_authorized = true
					}
				}
			} else if toSearch.Scope == "picker" {
				for i := 0; i < len(playlist.Guests); i++ {
					if playlist.Guests[i].Id == user.Id.Hex() && playlist.Guests[i].Contributor {
						user_authorized = true
					}
				}
			} else if toSearch.Scope == "search" && playlist.Status == "public" {
				user_authorized = true

				for i := 0; i < len(playlist.Guests); i++ {
					if playlist.Guests[i].Id == user.Id.Hex() && playlist.Guests[i].Contributor {
						user_authorized = false
					}
				}
			}

			if (toSearch.Scope == "playlist" || toSearch.Scope == "picker") && (toSearch.User_id == playlist.Owner_id || user_authorized) {
				*playlists = append(*playlists, playlist)
			} else if toSearch.Scope == "search" && toSearch.User_id != playlist.Owner_id && playlist.Status != "private" && user_authorized {
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

	var playlist model.Playlist

	if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&playlist); err != nil {
		return response.BddError
	}	

	_, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return response.BddError
	}

	fmt.Println("Playlist has been updated!")

	return response.Ok
}

func Delete(param string) int {
	var playlist model.Playlist

	if err := Read(param, &playlist); err != response.Ok {
		return err
	}

	playlist_id, _ := primitive.ObjectIDFromHex(param)
	playlist_filter := bson.D{{"_id", playlist_id}}

	_, playlist_err := db.PlaylistCollection.DeleteOne(context.TODO(), playlist_filter)

	if playlist_err != nil {
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

func AddGuest(playlistId string, guest *model.Guest) int {
	id, _ := primitive.ObjectIDFromHex(playlistId)
	guestId, _ := primitive.ObjectIDFromHex(guest.Id)
	filter := bson.D{{"_id", id}}
	guestFilter := bson.D{{"_id", guestId}}
	var result model.Playlist
	var user model.User
	contributorExist := false

	if guest.Id == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), guestFilter).Decode(&user); err != nil {
		return response.BddError
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return response.BddError
	} else if result.Owner_id == user.Id.Hex() {
		return response.BddError
	}

	for i := 0; i < len(result.Guests); i++ {
		if result.Guests[i].Id == guest.Id {
			contributorExist = true
			result.Guests[i].Contributor = guest.Contributor
		}
	}

	if !contributorExist {
		result.Guests = append(result.Guests, *guest)
	}

	update := bson.M{
		"$set": bson.D{
			{"guests", result.Guests},
		},
	}

	if _, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func RemoveGuest(playlistId string, guest *model.Guest) int {
	pId, _ := primitive.ObjectIDFromHex(playlistId)
	guest_id, _ := primitive.ObjectIDFromHex(guest.Id)
	playlistFilter := bson.D{{"_id", pId}}
	userFilter := bson.D{{"_id", guest_id}}
	var result model.Playlist
	var user model.User
	contributorExist := false

	if guest.Id == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), userFilter).Decode(&user); err != nil {
		// TODO verif is not Owner_ID
		return response.BddError
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), playlistFilter).Decode(&result); err != nil {
		return response.BddError
	}

	for i := 0; i < len(result.Guests); i++ {
		if result.Guests[i].Id == guest.Id {
			contributorExist = true

			result.Guests = append(result.Guests[:i], result.Guests[i+1:]...)
		}
	}

	if !contributorExist {
		return response.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"guests", result.Guests},
		},
	}

	if _, err := db.PlaylistCollection.UpdateOne(context.TODO(), playlistFilter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadGuests(param string, users *[]model.User) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var playlist model.Playlist
	var guestIds []primitive.ObjectID

	if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&playlist); err != nil {
		return response.BddError
	}

	for _, guest := range playlist.Guests {
		objID, err := primitive.ObjectIDFromHex(guest.Id)

		if err == nil {
			guestIds = append(guestIds, objID)
		}
	}

	cur, err := db.UserCollection.Find(context.TODO(), bson.M{"_id": bson.M{"$in": guestIds}})

	if err != nil {
		return response.Nonexistence
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.User

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*users = append(*users, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func Delegate(playlist_id string, new_owner_id string) int {
	var playlist model.Playlist
	var new_owner model.Playlist
	var new_owner_is_authorized bool

	pid, _ := primitive.ObjectIDFromHex(playlist_id)
	uid, _ := primitive.ObjectIDFromHex(new_owner_id)
	playlist_filter := bson.D{{"_id", pid}}
	new_owner_filter := bson.D{{"_id", uid}}

	if new_owner_id == "" {
		return response.FieldIsMissing
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), playlist_filter).Decode(&playlist); err != nil {
		return response.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), new_owner_filter).Decode(&new_owner); err != nil {
		return response.BddError
	}

	for i := 0; i < len(playlist.Guests); i++ {
		if playlist.Guests[i].Id == new_owner_id {
			new_owner_is_authorized = true

			playlist.Guests = append(playlist.Guests[:i], playlist.Guests[i+1:]...)
		}
	}

	if (!new_owner_is_authorized) {
		return response.Unauthorized
	}

	playlist.Guests = append(playlist.Guests, model.Guest{playlist.Owner_id, true})

	fields_to_update := bson.M{
		"$set": bson.D{
			{"owner_id", new_owner_id},
			{"guests", playlist.Guests},
		},
	}

	if _, err := db.PlaylistCollection.UpdateOne(context.TODO(), playlist_filter, fields_to_update); err != nil {
		return response.BddError
	}

	return response.Ok
}
