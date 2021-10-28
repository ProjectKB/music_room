package controllers

import (
	"context"
	"server/model"
	"server/response"
	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ReadAll(notifications *[]model.Notification) int {
	// Passing bson.D{} as the filter matches all documents in the User collection
	cur, err := db.NotificationCollection.Find(context.TODO(), bson.D{})

	if err != nil {
		return response.BddError
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		var elem model.Notification

		if err := cur.Decode(&elem); err != nil {
			return response.BddError
		}

		*notifications = append(*notifications, elem)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	return response.Ok
}

func Read(notifications_id string, notifications *model.Notifications) int {
	id, _ := primitive.ObjectIDFromHex(notifications_id)
	filter := bson.D{{"_id", id}}

	if err := db.NotificationCollection.FindOne(context.TODO(), filter).Decode(&notifications); err != nil {
		return response.BddError
	}

	return response.Ok
}

func ReadNotification(notifications_id string, notification_id string) int {
	id, _ := primitive.ObjectIDFromHex(notifications_id)
	filter := bson.D{{"_id", id}}
	var notifications model.Notifications

	if err := db.NotificationCollection.FindOne(context.TODO(), filter).Decode(&notifications); err != nil {
		return response.BddError
	}

	var check bool

	for i := 0; i < len(notifications.Notifications); i++ {
		if notifications.Notifications[i].Id == notification_id && !notifications.Notifications[i].Readed {
			check = true
			notifications.Notifications[i].Readed = true
		}
	}

	if !check {
		return response.Nonexistence
	}

	update := bson.M{
		"$set": bson.D{
			{"notifications", notifications.Notifications},
			{"notifications_count", notifications.Notifications_count - 1},
		},
	}

	if _, err := db.NotificationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}

func SendFriendShipRequest(notifications_id string, user_id string, new_notification *model.Notification) int {
	id, _ := primitive.ObjectIDFromHex(notifications_id)
	filter := bson.D{{"_id", id}}
	userId, _ := primitive.ObjectIDFromHex(user_id)
	user_filter := bson.D{{"_id", userId}}
	var notifications model.Notifications
	var user model.User

	if err := db.NotificationCollection.FindOne(context.TODO(), filter).Decode(&notifications); err != nil {
		return response.BddError
	} else if err := db.UserCollection.FindOne(context.TODO(), user_filter).Decode(&user); err != nil {
		return response.BddError
	}

	update := bson.M{
		"$set": bson.D{
			{"notifications", append(notifications.Notifications, *new_notification)},
			{"notifications_count", notifications.Notifications_count + 1},
		},
	}

	if _, err := db.NotificationCollection.UpdateOne(context.TODO(), filter, update); err != nil {
		return response.BddError
	}

	return response.Ok
}
