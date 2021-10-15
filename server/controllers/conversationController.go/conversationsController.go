package controllers

import (
	"context"
	"server/response"
	"server/socket"

	db "server/system/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddMessage(conversationId string, message socket.Message) int {
	id, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.D{{"_id", id}}
	var conversation socket.Conversation

	if err := db.ConversationCollection.FindOne(context.TODO(), filter).Decode(&conversation); err != nil {
		return response.BddError
	}

	field_to_update := bson.M{
		"$set": bson.D{
			{"notifications", append(conversation.Messages, message)},
		},
	}

	if _, err := db.ConversationCollection.UpdateOne(context.TODO(), filter, field_to_update); err != nil {
		return response.BddError
	}

	return response.Ok
}
