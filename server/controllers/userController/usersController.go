package controllers

import (
	"context"
	"fmt"
	"log"
	"server/errors"
	"server/model"
	db "server/system/db"

	"regexp"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.User) int {
	mail_regex := "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
	match, _ := regexp.MatchString(mail_regex, elem.Mail)
	var isDuplicated *model.User

	if elem.Login == "" || elem.Mail == "" || elem.Password == "" {
		return errors.FieldIsMissing
	} else if !match {
		return errors.MailInvalidFormat
	} else if dbErr := db.UserCollection.FindOne(context.TODO(), bson.D{{"mail", elem.Mail}}).Decode(&isDuplicated); dbErr != nil {
		return errors.BddError
	} else if isDuplicated != nil {
		return errors.MailAlreadyExist
	} else if _, err := db.UserCollection.InsertOne(context.TODO(), elem); err != nil {
		return errors.BddError
	}

	fmt.Println("Inserted a single document")
	return errors.None
}

func Read(param string, result *model.User) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return errors.BddError
	}

	return errors.None
}

func ReadAll(users *[]model.User) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.UserCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return errors.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.User

		if err := cur.Decode(&elem); err != nil {
			return errors.BddError
		}

		*users = append(*users, elem)
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

	updateResult, err := db.UserCollection.UpdateOne(context.TODO(), filter, update)
	
	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return errors.None
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.UserCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
	return errors.None
}

func DeleteAll() {
	deleteResult, err := db.UserCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the users collection\n", deleteResult.DeletedCount)
}

// TODO add bdd error to every methods + think about update
