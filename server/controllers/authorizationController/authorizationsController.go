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

func Create(elem *model.Authorization) {
	_, err := db.AuthorizationCollection.InsertOne(context.TODO(), elem)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document")
}

func Read(param string) *model.Authorization {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	// create a value into which the result can be decoded
	var result *model.Authorization

	err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	return result
}

func ReadAll() []*model.Authorization {
	var authorization []*model.Authorization

	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.AuthorizationCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Fatal(err)
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem model.Authorization
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		authorization = append(authorization, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return authorization
}

func Update(doc *model.Authorization, param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": bson.D{
			{"status", doc.Status},
			{"guests", doc.Guests},
			{"contributors", doc.Contributors},
		},
	}

	updateResult, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
}

func Delete(param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.AuthorizationCollection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the authorization collection\n", deleteResult.DeletedCount)
}

func DeleteAll() {
	deleteResult, err := db.AuthorizationCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the authorization collection\n", deleteResult.DeletedCount)
}
