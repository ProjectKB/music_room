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
	default_avatar := "path_to_default_avatar"
	match, _ := regexp.MatchString(mail_regex, elem.Mail)
	var isDuplicated *model.User

	if elem.Avatar == "" {
		elem.Avatar = default_avatar
	}

	if elem.Login == "" || elem.Mail == "" || elem.Password == "" {
		return errors.FieldIsMissing
	} else if !match {
		return errors.InvalidFormat
	} else if dbErr := db.UserCollection.FindOne(context.TODO(), bson.D{{"mail", elem.Mail}}).Decode(&isDuplicated); dbErr != nil {
		return errors.BddError
	} else if isDuplicated != nil {
		return errors.AlreadyExist
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

func AddFriend(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	friendId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	friendFilter := bson.D{{"_id", friendId}}
	var user model.User
	var friend model.User

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.UserCollection.FindOne(context.TODO(), friendFilter).Decode(&friend); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Friends); i++ {
		if user.Friends[i] == *idToAdd {
			return errors.Unauthorized
		}
	}

	user.Friends = append(user.Friends, *idToAdd)

	update := bson.M{
		"$set": bson.D{
			{"friends", user.Friends},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

func RemoveFriend(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	friendId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	friendFilter := bson.D{{"_id", friendId}}
	friendExist := false
	var user model.User
	var friend model.User

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.UserCollection.FindOne(context.TODO(), friendFilter).Decode(&friend); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Friends); i++ {
		if user.Friends[i] == *idToAdd {
			friendExist = true
			user.Friends = append(user.Friends[:i], user.Friends[i+1:]...)
		}
	}

	if !friendExist {
		return errors.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"friends", user.Friends},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

func AddPlaylist(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	playlistId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	playlistFilter := bson.D{{"_id", playlistId}}
	var user model.User
	var playlist model.Event

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), playlistFilter).Decode(&playlist); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Playlists); i++ {
		if user.Playlists[i] == *idToAdd {
			return errors.Unauthorized
		}
	}

	user.Playlists = append(user.Playlists, *idToAdd)

	update := bson.M{
		"$set": bson.D{
			{"playlists", user.Playlists},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

func RemovePlaylist(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	playlistId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	playlistFilter := bson.D{{"_id", playlistId}}
	playlistExist := false
	var user model.User
	var playlist model.Playlist

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.PlaylistCollection.FindOne(context.TODO(), playlistFilter).Decode(&playlist); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Playlists); i++ {
		if user.Playlists[i] == *idToAdd {
			playlistExist = true
			user.Playlists = append(user.Playlists[:i], user.Playlists[i+1:]...)
		}
	}

	if !playlistExist {
		return errors.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"playlists", user.Playlists},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

func AddEvent(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	eventId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	eventFilter := bson.D{{"_id", eventId}}
	var user model.User
	var event model.Event

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.EventCollection.FindOne(context.TODO(), eventFilter).Decode(&event); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Events); i++ {
		if user.Events[i] == *idToAdd {
			return errors.Unauthorized
		}
	}

	user.Events = append(user.Events, *idToAdd)

	update := bson.M{
		"$set": bson.D{
			{"events", user.Events},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}

func RemoveEvent(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	eventId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	eventFilter := bson.D{{"_id", eventId}}
	eventExist := false
	var user model.User
	var event model.Event

	if *idToAdd == "" {
		return errors.FieldIsMissing
	} else if userId == *idToAdd {
		return errors.Unauthorized
	} else if err := db.EventCollection.FindOne(context.TODO(), eventFilter).Decode(&event); err != nil {
		return errors.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return errors.BddError
	}

	for i := 0; i < len(user.Events); i++ {
		if user.Events[i] == *idToAdd {
			eventExist = true
			user.Events = append(user.Events[:i], user.Events[i+1:]...)
		}
	}

	if !eventExist {
		return errors.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"events", user.Events},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return errors.BddError
	}

	return errors.None
}
