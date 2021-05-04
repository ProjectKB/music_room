package system

import (
	"encoding/json"
	"net/http"
	authorizationController "server/controllers/authorizationController"
	"server/model"

	"github.com/gorilla/mux"
)

func ReadAllAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	response := authorizationController.ReadAll()
	json.NewEncoder(w).Encode(response)
}

func ReadOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	response := authorizationController.Read(params["id"])
	json.NewEncoder(w).Encode(response)
}

func DeleteOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	authorizationController.Delete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func CreateOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var authorization model.Authorization
	json.NewDecoder(r.Body).Decode(&authorization)
	authorizationController.Create(&authorization)
	json.NewEncoder(w).Encode(authorization)
}

func UpdateOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var authorization model.Authorization
	params := mux.Vars(r)
	json.NewDecoder(r.Body).Decode(&authorization)
	authorizationController.Update(&authorization, params["id"])
	json.NewEncoder(w).Encode(authorization)
}
