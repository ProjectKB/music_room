package controllers

import (
	"context"
	"fmt"
	"log"
	"server/model"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.Playlist) {
	_, err := db.PlaylistCollection.InsertOne(context.TODO(), elem)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document")
}

func Read(param string) *model.Playlist {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	// create a value into which the result can be decoded
	var result *model.Playlist

	err := db.PlaylistCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	return result
}

func ReadAll() []*model.Playlist {
	var playlist []*model.Playlist

	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.PlaylistCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Fatal(err)
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem model.Playlist
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		playlist = append(playlist, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return playlist
}

func Update(doc *model.Playlist, param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": bson.D{
			{"owner_id", doc.Owner_id},
			{"authorization_id", doc.Authorization_id},
			{"songs", doc.Songs},
			{"picture", doc.Picture},
		},
	}

	updateResult, err := db.PlaylistCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
}

func Delete(param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.PlaylistCollection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
}

func DeleteAll() {
	deleteResult, err := db.PlaylistCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the playlist collection\n", deleteResult.DeletedCount)
}
