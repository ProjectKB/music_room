package controllers

import (
	"context"
	"fmt"
	"log"
	playlistController "server/controllers/playlistController"
	"server/helpers"
	"server/model"
	"server/response"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// TODO Create blacklisted fields function

func Create(elem *model.Event) int {
	default_picture := "path_to_default_picture"
	var playlist model.Playlist

	if elem.Picture == "" {
		elem.Picture = default_picture
	}

	if elem.Status != "" {
		return response.Unauthorized
	} else if elem.Name == "" || elem.Start == "" || elem.End == "" {
		return response.FieldIsMissing
	} else if err := helpers.CheckEventBlacklistedFields(elem, "CREATE"); err != response.Ok {
		return response.Unauthorized
	}
	
	if elem.Playlist_id != "" {
		playlistId, _ := primitive.ObjectIDFromHex(elem.Playlist_id)
		playlistFilter := bson.D{{"_id", playlistId}}

		if err := db.PlaylistCollection.FindOne(context.TODO(), playlistFilter).Decode(&playlist); err != nil {
			return response.BddError
		}
	} else {
		playlist = model.Playlist{primitive.NewObjectID(), elem.Name, elem.Owner_id, "", nil, elem.Picture}

		if err := playlistController.Create(&playlist); err != response.Ok {
			return err
		}
	}

	elem.Playlist_id = playlist.Id.Hex()
	elem.Status = "pending"

	if _, err := db.EventCollection.InsertOne(context.TODO(), elem); err != nil {
		return response.BddError
	}

	fmt.Println("Inserted a single document")
	return response.Ok
}

func Read(param string, result *model.Event) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.EventCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadAll(events *[]model.Event) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.EventCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Event

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*events = append(*events, elem)
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

	updateResult, err := db.EventCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return response.Ok
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.EventCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Deleted %v documents in the event collection\n", deleteResult.DeletedCount)
	return response.Ok
}

func DeleteAll() {
	deleteResult, err := db.EventCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the event collection\n", deleteResult.DeletedCount)
}

func AddPlaylistToEvent(eventId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(eventId)
	playlistId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	playlistFilter := bson.D{{"_id", playlistId}}
	var event model.Event
	var playlist model.Playlist

	if *idToAdd == "" {
		return response.FieldIsMissing
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), playlistFilter).Decode(&playlist); err != nil {
		return response.BddError
	} else if err := db.EventCollection.FindOne(context.TODO(), filter).Decode(&event); err != nil {
		return response.BddError
	}

	update := bson.M{
		"$set": bson.D{
			{"playlist_id", *idToAdd},
		},
	}

	if _, err := db.EventCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func RemovePlaylistFromEvent(eventId string) int {
	id, _ := primitive.ObjectIDFromHex(eventId)
	filter := bson.D{{"_id", id}}
	var event model.Event

	if err := db.EventCollection.FindOne(context.TODO(), filter).Decode(&event); err != nil {
		return response.BddError
	} else if event.Playlist_id == "" {
		return response.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"playlist_id", ""},
		},
	}

	if _, err := db.EventCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func UpdateStatus(eventId string, statutToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(eventId)
	filter := bson.D{{"_id", id}}
	var event model.Event

	fmt.Println(*statutToAdd)
	if *statutToAdd == "" {
		return response.FieldIsMissing
	} else if *statutToAdd != "pending" && *statutToAdd != "ongoing" && *statutToAdd != "finished" {
		return response.Unauthorized
	} else if err := db.EventCollection.FindOne(context.TODO(), filter).Decode(&event); err != nil {
		return response.BddError
	}

	update := bson.M{
		"$set": bson.D{
			{"statut", *statutToAdd},
		},
	}

	if _, err := db.EventCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}
