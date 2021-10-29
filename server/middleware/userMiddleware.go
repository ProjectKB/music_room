package middleware

import (
	"encoding/json"
	"net/http"
	userController "server/controllers/userController"
	"server/helpers"

	"server/model"
	"server/response"

	"github.com/gorilla/mux"
)

func ReadAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.User

	if err := userController.ReadAll(&results); err != response.Ok {
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

	if err := userController.Read(params["id"], &result); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var query string
	params := mux.Vars(r)

	var results []model.User

	if err := json.NewDecoder(r.Body).Decode(&query); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := userController.SearchUsers(params["id"], query, &results); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func DeleteOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := userController.Delete(params["id"]); err != response.Ok {
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

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := userController.Create(&user); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response.GetSuccessMessage("User", response.Create))
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var user model.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := userController.Login(&user); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(user)
}

func CheckUserPreferences(preferences []string) int {
	var check bool
	music_preferences := [9]string{"Rap FR", "Rap US", "Rock", "Metal", "Classic", "Electro", "Trance", "Low-Fi", "House"}

	for _, new_preference := range preferences {
		check = false

		for _, preference := range music_preferences {
			if new_preference == preference {
				check = true
			}
		}
		if !check {
			return response.Unauthorized
		}
	}

	return response.Ok
}

func UpdateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	var user interface{}

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	filter := helpers.UpdateUserFilter(user)

	if len(filter) == 0 {
		http.Error(w, response.ErrorMessages[response.Unauthorized], http.StatusBadRequest)
		return
	} else if err := userController.Update(filter, params["id"]); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("User", response.Update))
}

// func ConfirmFriend(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "PUT")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 	var user_to_confirm model.Friend
// 	params := mux.Vars(r)

// 	if err := json.NewDecoder(r.Body).Decode(&user_to_confirm); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	} else if err := userController.ConfirmFriend(params["id"], user_to_confirm); err != response.Ok {
// 		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
// 		return
// 	}

// 	if user_to_confirm.Confirmed {
// 		json.NewEncoder(w).Encode(response.GetSuccessMessage("Friendship", response.Confirm))
// 	} else {
// 		json.NewEncoder(w).Encode(response.GetSuccessMessage("Friendship", response.Deny))
// 	}
// }

func AddEventToUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var eventId string
	params := mux.Vars(r)

	if err := json.NewDecoder(r.Body).Decode(&eventId); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := userController.AddEvent(params["id"], &eventId); err != response.Ok {
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

	if err := json.NewDecoder(r.Body).Decode(&eventId); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := userController.RemoveEvent(params["id"], &eventId); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Delete))
}

func ReadUserEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var events []model.Event

	if err := userController.ReadEvents(params["id"], &events); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(events)
}

func ReadUserFriends(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var users []model.User

	if err := userController.ReadFriends(params["id"], &users); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(users)
}

func ReadUserConversations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	conversations := make(map[string]model.Conversation)

	if err := userController.ReadConversations(params["id"], conversations); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(conversations)
}
