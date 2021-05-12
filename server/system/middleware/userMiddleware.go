package system

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	userController "server/controllers/userController"
	"server/model"
	"server/response"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.User

	if err := userController.ReadAll(&results); err != response.None {
		fmt.Println(err, results)
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.User

	if err := userController.Read(params["id"], &result); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
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

	if err := userController.Delete(params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("User", response.Delete))
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
	} else if err := userController.Create(&user); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response.GetSuccessMessage("User", response.Create))
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
		http.Error(w, response.ErrorMessages[response.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := userController.Update(filter, params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("User", response.Update))
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
	} else if err := userController.AddFriend(params["id"], &friendId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
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
	} else if err := userController.RemoveFriend(params["id"], &friendId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Friend", response.Delete))
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
	} else if err := userController.AddPlaylist(params["id"], &playlistId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Create))
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
	} else if err := userController.RemovePlaylist(params["id"], &playlistId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Delete))
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
	} else if err := userController.AddEvent(params["id"], &eventId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Create))
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
	} else if err := userController.RemoveEvent(params["id"], &eventId); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Delete))
}
