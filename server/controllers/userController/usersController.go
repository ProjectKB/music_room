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

func Create(elem *model.User) {
	
	_, err := db.UserCollection.InsertOne(context.TODO(), elem)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document")
}

func Read(param string) *model.User {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	// create a value into which the result can be decoded
	var result *model.User

	err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	return result
}

func ReadAll() []*model.User {
	var users []*model.User

	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.UserCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Fatal(err)
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem model.User
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		users = append(users, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return users
}

func Update(doc *model.User, param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": bson.D{
			{"login", doc.Login},
			{"mail", doc.Mail},
			{"friends", doc.Friends},
			{"events", doc.Events},
			{"playlists", doc.Playlists},
			{"avatar", doc.Avatar},
		},
	}

	updateResult, err := db.UserCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
}

func Delete(param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.UserCollection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
}

func DeleteAll() {
	deleteResult, err := db.UserCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
}
