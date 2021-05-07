package system

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	eventController "server/controllers/eventController"
	"server/errors"
	"server/model"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.Event

	if err := eventController.ReadAll(&results); err != errors.None {
		fmt.Println(err, results)
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.Event

	if err := eventController.Read(params["id"], &result); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := eventController.Delete(params["id"]); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(params["id"])
}

func CreateOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var event model.Event
	jsonErr := json.NewDecoder(r.Body).Decode(&event)

	if jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.Create(&event); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(event)
}

func updateEventFilter(doc *model.Event) bson.M {
	filter := bson.M{}
	default_picture := "path_to_default_picture"

	if doc.Picture == "" {
		doc.Picture = default_picture
	}

	v := reflect.ValueOf(*doc)
	typeOfS := v.Type()
	for i := 0; i < v.NumField(); i++ {
		if (typeOfS.Field(i).Name == "Name" || typeOfS.Field(i).Name == "Start" || typeOfS.Field(i).Name == "End") && v.Field(i).Interface() != "" {
			filter[strings.ToLower(typeOfS.Field(i).Name)] = v.Field(i).Interface()
		}
	}

	return filter
}

func UpdateOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var event model.Event
	params := mux.Vars(r)

	json.NewDecoder(r.Body).Decode(&event)
	filter := updateEventFilter(&event)

	if len(filter) == 0 {
		http.Error(w, errors.ErrorMessages[errors.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := eventController.Update(filter, params["id"]); err != errors.None {
		http.Error(w, errors.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(event)
}
