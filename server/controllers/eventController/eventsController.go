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

func Create(elem *model.Event) {
	_, err := db.EventCollection.InsertOne(context.TODO(), elem)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document")
}

func Read(param string) *model.Event {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	// create a value into which the result can be decoded
	var result *model.Event

	err := db.EventCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	return result
}

func ReadAll() []*model.Event {
	var event []*model.Event

	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.EventCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Fatal(err)
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem model.Event
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		event = append(event, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return event
}

func Update(doc *model.Event, param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": bson.D{
			{"playlist_id", doc.Playlist_id},
			{"picture", doc.Picture},
			{"start", doc.Start},
			{"end", doc.End},
			{"location", doc.Location},
		},
	}

	updateResult, err := db.EventCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
}

func Delete(param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.EventCollection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the event collection\n", deleteResult.DeletedCount)
}

func DeleteAll() {
	deleteResult, err := db.EventCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the event collection\n", deleteResult.DeletedCount)
}
