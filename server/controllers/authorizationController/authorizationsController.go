package controllers

import (
	"context"
	"fmt"
	"log"
	"server/model"
	"server/response"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.Authorization) int {
	if _, err := db.AuthorizationCollection.InsertOne(context.TODO(), elem); err != nil {
		return response.BddError
	}

	fmt.Println("Inserted a single document")
	return response.None
}

func Read(param string, result *model.Authorization) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return response.BddError
	}

	return response.None
}

func ReadAll(authorizations *[]model.Authorization) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.AuthorizationCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Authorization

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*authorizations = append(*authorizations, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("DB Fetch went well!\n")

	return response.None
}

func Update(fields bson.M, param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	update := bson.M{
		"$set": fields,
	}

	updateResult, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Matched %v documents and updated %v documents\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	return response.None
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	deleteResult, err := db.AuthorizationCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Deleted %v documents in the authorization collection\n", deleteResult.DeletedCount)
	return response.None
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
	var user model.User
	contributorExist := false

	if guest.Id == "" || guest.Name == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), guestFilter).Decode(&user); err != nil {
		// TODO verif is not Owner_ID
		return response.BddError
	} else if err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
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

	if _, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.None
}

func RemoveGuest(authorizationId string, guest *model.Guest) int {
	id, _ := primitive.ObjectIDFromHex(authorizationId)
	guestId, _ := primitive.ObjectIDFromHex(guest.Id)
	filter := bson.D{{"_id", id}}
	guestFilter := bson.D{{"_id", guestId}}
	var result model.Authorization
	var user model.User
	contributorExist := false

	if guest.Id == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), guestFilter).Decode(&user); err != nil {
		// TODO verif is not Owner_ID
		return response.BddError
	} else if err := db.AuthorizationCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
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

	if _, err := db.AuthorizationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.None
}

// TODO add bdd error to every methods + think about update
