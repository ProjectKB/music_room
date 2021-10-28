package middleware

import (
	"encoding/json"
	"net/http"
	notificationController "server/controllers/notificationController"
	"server/model"

	"server/response"

	"github.com/gorilla/mux"
)

func ReadAllNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.Notification

	if err := notificationController.ReadAll(&results); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var notifications model.Notifications
	params := mux.Vars(r)
	
	if err := notificationController.Read(params["id"], &notifications); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}
	
	json.NewEncoder(w).Encode(notifications)
}

// func SendFriendShipRequest(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "PUT")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 	var friend_id string
// 	params := mux.Vars(r)

// 	if err := json.NewDecoder(r.Body).Decode(&friend_id); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	} else if err := notificationController.SendFriendShipRequest(params["id"], friend_id); err != response.Ok {
// 		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(response.GetSuccessMessage("Friend Request", response.Sent))
// }

func ReadNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var notification_id string
	params := mux.Vars(r)

	if err := json.NewDecoder(r.Body).Decode(&notification_id); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := notificationController.ReadNotification(params["id"], notification_id); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Notification", response.Readed))
}
