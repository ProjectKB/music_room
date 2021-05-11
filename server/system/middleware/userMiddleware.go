package system

import (
	"encoding/json"
	"fmt"
	"net/http"
	userController "server/controllers/userController"
	"server/errors"
	"server/model"
	"strings"
	"reflect"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.User

	if err := userController.ReadAll(&results); err != errors.None {
		fmt.Println(err, results)
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.User

	if err := userController.Read(params["id"], &result); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := userController.Delete(params["id"]); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(params["id"])
}

func CreateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var user model.User
	jsonErr := json.NewDecoder(r.Body).Decode(&user)

	if jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.Create(&user); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func updateUserFilter(doc *model.User) bson.M {
	filter := bson.M{}
	default_avatar := "path_to_default_avatar"

	if doc.Avatar == "" {
		doc.Avatar = default_avatar
	}

	v := reflect.ValueOf(*doc)
	typeOfS := v.Type()

	for i := 0; i < v.NumField(); i++ {
		if (typeOfS.Field(i).Name == "Login" || typeOfS.Field(i).Name == "Password" || typeOfS.Field(i).Name == "Avatar") && v.Field(i).Interface() != "" {
			filter[strings.ToLower(typeOfS.Field(i).Name)] = v.Field(i).Interface()
		}
	}

	return filter
}

func UpdateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var user model.User
	params := mux.Vars(r)
	
	json.NewDecoder(r.Body).Decode(&user)
	filter := updateUserFilter(&user)

	if len(filter) == 0 {
		http.Error(w, errors.ErrorMessages[errors.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := userController.Update(filter, params["id"]); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	} 

	json.NewEncoder(w).Encode(user)
}

func AddFriendToUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var friendId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&friendId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.AddFriend(params["id"], &friendId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(friendId)
}

func RemoveFriendFromUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var friendId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&friendId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.RemoveFriend(params["id"], &friendId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(friendId)
}

func AddPlaylistToUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var playlistId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&playlistId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.AddPlaylist(params["id"], &playlistId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(playlistId)
}

func RemovePlaylistFromUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var playlistId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&playlistId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.RemovePlaylist(params["id"], &playlistId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(playlistId)
}

func AddEventToUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var eventId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&eventId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.AddEvent(params["id"], &eventId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(eventId)
}

func RemoveEventFromUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var eventId string
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&eventId); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := userController.RemoveEvent(params["id"], &eventId); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(eventId)
}
