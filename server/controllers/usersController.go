package controllers

import (
	"context"
	"fmt"
	"log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"server/model"
	db "server/system/db"
)

func Create(elem *model.User) {
	_, err := db.Collection.InsertOne(context.TODO(), elem)

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

	err := db.Collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	return result
}

func ReadAll() []*model.User {
	var users []*model.User

	// Pass these options to the Find method
	findOptions := options.Find().SetProjection(bson.M{"age": 0, "gender": 0})

	// Passing bson.D{} as the filter matches all documents in the collection
	cur, err := db.Collection.Find(context.TODO(), bson.D{}, findOptions)

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
		},
	}

	updateResult, err := db.Collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
}

func Delete(param string) {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.Collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
}

func DeleteAll() {
	deleteResult, err := db.Collection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
}
