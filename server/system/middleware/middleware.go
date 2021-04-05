package system

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
	"server/controllers"
	"server/model"
)

func ReadAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	response := controllers.ReadAll()
	json.NewEncoder(w).Encode(response)
}

func ReadOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	response := controllers.Read(params["id"])
	json.NewEncoder(w).Encode(response)
}

func DeleteOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	controllers.Delete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func CreateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var user model.User
	json.NewDecoder(r.Body).Decode(&user)
	controllers.Create(&user)
	json.NewEncoder(w).Encode(user)
}

func UpdateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var user model.User
	params := mux.Vars(r)
	json.NewDecoder(r.Body).Decode(&user)
	controllers.Update(&user, params["id"])
	json.NewEncoder(w).Encode(user)
}
