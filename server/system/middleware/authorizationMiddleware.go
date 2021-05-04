package system

import (
	"encoding/json"
	"net/http"
	eventController "server/controllers/eventController"
	"server/model"

	"github.com/gorilla/mux"
)

func ReadAllEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	response := eventController.ReadAll()
	json.NewEncoder(w).Encode(response)
}

func ReadOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	response := eventController.Read(params["id"])
	json.NewEncoder(w).Encode(response)
}

func DeleteOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	eventController.Delete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func CreateOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var event model.Event
	json.NewDecoder(r.Body).Decode(&event)
	eventController.Create(&event)
	json.NewEncoder(w).Encode(event)
}

func UpdateOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var event model.Event
	params := mux.Vars(r)
	json.NewDecoder(r.Body).Decode(&event)
	eventController.Update(&event, params["id"])
	json.NewEncoder(w).Encode(event)
}
