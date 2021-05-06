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

func updateUserFilter(doc model.User) bson.M {
	filter := bson.M{}

	v := reflect.ValueOf(doc)
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
	filter := updateUserFilter(user)

	if len(filter) == 0 {
		http.Error(w, errors.ErrorMessages[errors.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := userController.Update(filter, params["id"]); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	} 

	json.NewEncoder(w).Encode(user)
}
