package system

import (
	"encoding/json"
	"net/http"
	"reflect"
	authorizationController "server/controllers/authorizationController"
	"server/model"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"

	"server/response"
)

func ReadAllAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.Authorization

	if err := authorizationController.ReadAll(&results); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.Authorization

	if err := authorizationController.Read(params["id"], &result); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := authorizationController.Delete(params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Authorization", response.Delete))
}

func CreateOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var authorization model.Authorization
	jsonErr := json.NewDecoder(r.Body).Decode(&authorization)

	if jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := authorizationController.Create(&authorization); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response.GetSuccessMessage("Authorization", response.Create))
}

func updateAuthorizationFilter(doc *model.Authorization) bson.M {
	filter := bson.M{}

	v := reflect.ValueOf(*doc)
	typeOfS := v.Type()

	for i := 0; i < v.NumField(); i++ {
		if typeOfS.Field(i).Name == "Status" && v.Field(i).Interface() != "" {
			filter[strings.ToLower(typeOfS.Field(i).Name)] = v.Field(i).Interface()
		}
	}

	return filter
}

func UpdateOneAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var authorization model.Authorization
	params := mux.Vars(r)

	json.NewDecoder(r.Body).Decode(&authorization)
	filter := updateAuthorizationFilter(&authorization)

	if len(filter) == 0 {
		http.Error(w, response.ErrorMessages[response.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := authorizationController.Update(filter, params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Authorization", response.Update))
}

func AddGuestToAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var guest model.Guest
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&guest); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := authorizationController.AddGuest(params["id"], &guest); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Guest", response.Create))
}

func RemoveGuestFromAuthorization(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var guest model.Guest
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&guest); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := authorizationController.RemoveGuest(params["id"], &guest); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Guest", response.Delete))
}