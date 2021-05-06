package controllers

import (
	"context"
	"fmt"
	"log"
	"server/errors"
	"server/model"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.Playlist) int {
	if elem.Name == "" {
		return errors.FieldIsMissing
	} else if _, err := db.PlaylistCollection.InsertOne(context.TODO(), elem); err != nil {
		return errors.BddError
	}

	fmt.Println("Inserted a single document")
	return errors.None
}

func Read(param string, result *model.Playlist) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return errors.BddError
	}

	return errors.None
}

func ReadAll(playlists *[]model.Playlist) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.PlaylistCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return errors.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Playlist

		if err := cur.Decode(&elem); err != nil {
			return errors.BddError
		}

		*playlists = append(*playlists, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return errors.None
}

func Update(fields bson.M, param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": fields,
	}

	updateResult, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return errors.None
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.PlaylistCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
	return errors.None
}

func DeleteAll() {
	deleteResult, err := db.PlaylistCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
}

// TODO add bdd error to every methods + think about update
