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

func Create(elem *model.Authorization) int {
	if _, err := db.AuthorizationCollection.InsertOne(context.TODO(), elem); err != nil {
		return errors.BddError
	}

	fmt.Println("Inserted a single document")
	return errors.None
}

func Read(param string, result *model.Authorization) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return errors.BddError
	}

	return errors.None
}

func ReadAll(authorizations *[]model.Authorization) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.AuthorizationCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return errors.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Authorization

		if err := cur.Decode(&elem); err != nil {
			return errors.BddError
		}

		*authorizations = append(*authorizations, elem)
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

	updateResult, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return errors.None
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.AuthorizationCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return errors.BddError
	}

	fmt.Printf("Deleted %v documents in the authorization collection\n", deleteResult.DeletedCount)
	return errors.None
}

func DeleteAll() {
	deleteResult, err := db.AuthorizationCollection.DeleteMany(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents in the authorization collection\n", deleteResult.DeletedCount)
}

func AddGuest(authorizationId string, guest *model.Guest) int {
	id, _ := primitive.ObjectIDFromHex(authorizationId)
	guestId, _ := primitive.ObjectIDFromHex(guest.Id)
	filter := bson.D{{"_id", id}}
	guestFilter := bson.D{{"_id", guestId}}
	var result model.Authorization
	contributorExist := false

	// fix id pb

	if guest.Id == "" {
		return errors.FieldIsMissing
	} else if err := db.AuthorizationCollection.FindOne(context.TODO(), guestFilter).Decode(&result); err != nil {
		return errors.BddError
	} else if err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return errors.BddError
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

	if _, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

// TODO add bdd error to every methods + think about update
