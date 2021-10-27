package controllers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"server/helpers"
	"server/model"
	"server/response"
	"server/socket"
	db "server/system/db"

	"regexp"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Create(elem *model.User) int {
	mail_regex := "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
	match, _ := regexp.MatchString(mail_regex, elem.Mail)
	var isDuplicated *model.User

	if elem.Login == "" || elem.Mail == "" || elem.Password == "" {
		return response.FieldIsMissing
	}

	notifications := model.Notifications{primitive.NewObjectID(), elem.Login, nil, 0}
	
	if _, err := db.NotificationCollection.InsertOne(context.TODO(), notifications); err != nil {
		return response.BddError
	}

	elem.Notifications = notifications.Id.Hex()
	elem.Visibility = model.Visibility{"public", "private", "public", "public", "public"}


	if err := helpers.CheckUserBlacklistedFields(elem); err != response.Ok {
		return response.Unauthorized
	} else if !match {
		return response.InvalidFormat
	} else if err := db.UserCollection.FindOne(context.TODO(), bson.D{{"login", elem.Login}}).Decode(&isDuplicated); err == nil {
		return response.LoginAlreadyExist
	} else if err := db.UserCollection.FindOne(context.TODO(), bson.D{{"mail", elem.Mail}}).Decode(&isDuplicated); err == nil {
		return response.MailAlreadyExist
	} else if _, err := db.UserCollection.InsertOne(context.TODO(), elem); err != nil {
		return response.BddError
	}

	fmt.Println("Inserted a single document")
	return response.Ok
}

func Login(elem *model.User) int {
	filter := bson.D{{"login", elem.Login}, {"password", elem.Password}}

	if elem.Login == "" || elem.Password == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&elem); err != nil {
		return response.Nonexistence
	}

	b := make([]byte, 20)
	if _, err := rand.Read(b); err != nil {
		return response.InvalidFormat
	}

	elem.Token = hex.EncodeToString(b)

	Update(bson.M{"token": elem.Token}, elem.Id.Hex())

	fmt.Println("Connected!")

	return response.Ok
}

func Read(param string, result *model.User) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadAll(users *[]model.User) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.UserCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.User

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*users = append(*users, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func Update(fields bson.M, param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var user model.User
	update := bson.M{
		"$set": fields,
	}

	// check mail validity

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	var friend_to_remove []string

	if err := helpers.CheckFriendsField(fields, &user, &friend_to_remove); err != response.Ok {
		return err
	}

	if len(friend_to_remove) != 0 {
		for _, friend_id := range friend_to_remove {
			if err := RemoveFriend(friend_id, &user); err != response.Ok {
				return err
			}
		}
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	// send new user with socket

	return response.Ok
}

func Delete(param string) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var user model.User

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}
	
	notification_id, _ := primitive.ObjectIDFromHex(user.Notifications)
	notification_filter := bson.D{{"_id", notification_id}}
	_, err := db.NotificationCollection.DeleteOne(context.TODO(), notification_filter)
	
	if err != nil {
		return response.BddError
	}
	
	
	for i := 0; i < len(user.Friends); i++ {
		conversation_id, _ := primitive.ObjectIDFromHex(user.Friends[i].Conversation)
		conversation_filter := bson.D{{"_id", conversation_id}}
		_, err := db.ConversationCollection.DeleteOne(context.TODO(), conversation_filter)

		if err != nil {
			return response.BddError
		}
	}

	userResult, err := db.UserCollection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return response.BddError
	}

	fmt.Printf("Deleted %v documents in the users collection\n", userResult.DeletedCount)
	return response.Ok
}

func DeleteAll() {
	userResult, userErr := db.UserCollection.DeleteMany(context.TODO(), bson.D{{}})
	notificationResult, notificationErr := db.NotificationCollection.DeleteMany(context.TODO(), bson.D{{}})
	conversationResult, conversationErr := db.ConversationCollection.DeleteMany(context.TODO(), bson.D{{}})

	if userErr != nil || notificationErr != nil || conversationErr != nil {
		log.Fatal(userErr, notificationErr, conversationErr)
	}

	fmt.Printf("Deleted %v documents in the users collection\n", userResult.DeletedCount)
	fmt.Printf("Deleted %v documents in the notifications collection\n", notificationResult.DeletedCount)
	fmt.Printf("Deleted %v documents in the conversations collection\n", conversationResult.DeletedCount)
}

func ConfirmFriend(userId string, user_to_confirm model.Friend) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	friend_id, _ := primitive.ObjectIDFromHex(user_to_confirm.Id)
	filter := bson.D{{"_id", id}}
	friend_filter := bson.D{{"_id", friend_id}}
	var user model.User
	var friend model.User

	if user_to_confirm.Id == "" {
		return response.FieldIsMissing
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), friend_filter).Decode(&friend); err != nil {
		return response.BddError
	}

	if !user_to_confirm.Confirmed {
		return response.Ok
	}

	conversation := socket.Conversation{primitive.NewObjectID(), user.Login, friend.Login, nil}

	if _, err := db.ConversationCollection.InsertOne(context.TODO(), conversation); err != nil {
		return response.BddError
	}

	update_content := append(user.Friends, model.Friend{user_to_confirm.Id, true, conversation.Id.Hex()})
	update := bson.M{
		"$set": bson.D{
			{"friends", update_content},
		},
	}

	update_friend_content := append(friend.Friends, model.Friend{userId, true, conversation.Id.Hex()})
	update_friend := bson.M{
		"$set": bson.D{
			{"friends", update_friend_content},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		// send user updated by socket
		return response.BddError
	} else if _, err := db.UserCollection.UpdateOne(context.TODO(), friend_filter, update_friend); err != nil {
		// send new user to friend if connected + notification by socket
		return response.BddError
	}

	return response.Ok
}

func RemoveFriend(userId string, user_to_remove *model.User) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	filter := bson.D{{"_id", id}}
	var user model.User
	var friend_exist bool
	var conversation_to_remove_filter bson.D

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for i := 0; i < len(user.Friends); i++ {
		if user.Friends[i].Id == user_to_remove.Id.Hex() {
			friend_exist = true
			conversation_to_remove_id, _ := primitive.ObjectIDFromHex(user.Friends[i].Conversation)
			conversation_to_remove_filter = bson.D{{"_id", conversation_to_remove_id}}
			user.Friends = append(user.Friends[:i], user.Friends[i+1:]...)
		}
	}

	if !friend_exist {
		return response.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"friends", user.Friends},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	} else if _, err := db.ConversationCollection.DeleteOne(context.TODO(), conversation_to_remove_filter); err != nil {
		return response.BddError
	}

	return response.Ok
}

func AddEvent(userId string, idToAdd *string) int {
	id, _ := primitive.ObjectIDFromHex(userId)
	eventId, _ := primitive.ObjectIDFromHex(*idToAdd)
	filter := bson.D{{"_id", id}}
	eventFilter := bson.D{{"_id", eventId}}
	var user model.User
	var event model.Event

	if *idToAdd == "" {
		return response.FieldIsMissing
	} else if userId == *idToAdd {
		return response.Unauthorized
	} else if err := db.EventCollection.FindOne(context.TODO(), eventFilter).Decode(&event); err != nil {
		return response.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for i := 0; i < len(user.Events); i++ {
		if user.Events[i] == *idToAdd {
			return response.Unauthorized
		}
	}

	user.Events = append(user.Events, *idToAdd)

	update := bson.M{
		"$set": bson.D{
			{"events", user.Events},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
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
		return response.FieldIsMissing
	} else if userId == *idToAdd {
		return response.Unauthorized
	} else if err := db.EventCollection.FindOne(context.TODO(), eventFilter).Decode(&event); err != nil {
		return response.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for i := 0; i < len(user.Events); i++ {
		if user.Events[i] == *idToAdd {
			eventExist = true
			user.Events = append(user.Events[:i], user.Events[i+1:]...)
		}
	}

	if !eventExist {
		return response.Unauthorized
	}

	update := bson.M{
		"$set": bson.D{
			{"events", user.Events},
		},
	}

	if _, err := db.UserCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadEvents(param string, event *[]model.Event) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var user model.User

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	var eventIds []primitive.ObjectID

	for _, event := range user.Events {
		objID, err := primitive.ObjectIDFromHex(event)
		if err == nil {
			eventIds = append(eventIds, objID)
		}
	}

	cur, err := db.EventCollection.Find(context.TODO(), bson.M{"_id": bson.M{"$in": eventIds}})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Event

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*event = append(*event, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func ReadFriends(param string, users *[]model.User) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var user model.User
	var friendsIds []primitive.ObjectID

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for _, friend := range user.Friends {
		if friend.Confirmed {
			objID, err := primitive.ObjectIDFromHex(friend.Id)

			if err == nil {
				friendsIds = append(friendsIds, objID)
			}
		}
	}

	cur, err := db.UserCollection.Find(context.TODO(), bson.M{"_id": bson.M{"$in": friendsIds}})

	if err != nil {
		return response.Nonexistence
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.User

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*users = append(*users, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func ReadConversations(param string, conversations map[string]socket.Conversation) int {
	id, _ := primitive.ObjectIDFromHex(param)
	filter := bson.D{{"_id", id}}
	var user model.User
	var conversationsIds []primitive.ObjectID

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for _, friend := range user.Friends {
		if friend.Confirmed {
			objID, err := primitive.ObjectIDFromHex(friend.Conversation)

			if err == nil {
				conversationsIds = append(conversationsIds, objID)
			}
		}
	}

	cur, err := db.ConversationCollection.Find(context.TODO(), bson.M{"_id": bson.M{"$in": conversationsIds}})

	if err != nil {
		return response.Nonexistence
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem socket.Conversation
		var target string

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		} else if user.Login == elem.UserNameA {
			target = elem.UserNameB
		} else {
			target = elem.UserNameA
		}

		conversations[target] = elem
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func SearchUsers(user_id string, query string, users *[]model.User) int {
	id, _ := primitive.ObjectIDFromHex(user_id)
	filter := bson.D{{"_id", id}}
	var user model.User
	var friendsIds []primitive.ObjectID

	if err := db.UserCollection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		return response.BddError
	}

	for _, friend := range user.Friends {
		objID, err := primitive.ObjectIDFromHex(friend.Id)

		if err == nil {
			friendsIds = append(friendsIds, objID)
		}
	}

	friendsIds = append(friendsIds, id)

	cur, err := db.UserCollection.Find(context.TODO(), bson.M{"_id": bson.M{"$nin": friendsIds}})

	if err != nil {
		return response.Nonexistence
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.User

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		} else if elem.Login != "" && strings.Contains(elem.Login, query) {
			*users = append(*users, elem)
		}
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}
