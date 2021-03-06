package system

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var UserCollection *mongo.Collection
var PlaylistCollection *mongo.Collection
var EventCollection *mongo.Collection
var AuthorizationCollection *mongo.Collection

func loadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func ConnectToDB() {
	var err error

	loadEnv()

	// Set client options
	clientOptions := options.Client().ApplyURI(os.Getenv("DB_URI"))

	// Connect to MongoDB
	Client, err = mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	UserCollection = Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_USER"))
	PlaylistCollection = Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_PLAYLIST"))
	EventCollection = Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_EVENT"))
	AuthorizationCollection = Client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("DB_COLLECTION_AUTHORIZATION"))

	// Check the connection
	err = Client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
}

func StopDb() {
	err := Client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed")
}
