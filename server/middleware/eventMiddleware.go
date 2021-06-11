package middleware

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"reflect"
	eventController "server/controllers/eventController"
	"server/helpers"
	"server/model"
	"server/response"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.Event

	if err := eventController.ReadAll(&results); err != response.Ok {
		fmt.Println(err, results)
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.Event

	if err := eventController.Read(params["id"], &result); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
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

	if err := eventController.Delete(params["id"]); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Delete))
}

func SearchEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var results model.EventSearch
	var toSearch string

	if err := json.NewDecoder(r.Body).Decode(&toSearch); err != nil && err != io.EOF {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.SearchEvent(&results, toSearch); err != response.Ok {
		fmt.Println(err, results)
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func SearchEventStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var results []model.Event
	var toSearch string

	if err := json.NewDecoder(r.Body).Decode(&toSearch); err != nil && err != io.EOF {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.SearchEventStatus(&results, toSearch); err != response.Ok {
		fmt.Println(err, results)
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func CreateOneEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var event model.Event

	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.Create(&event); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Create))
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

	if err := json.NewDecoder(r.Body).Decode(&event); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := helpers.CheckEventBlacklistedFields(&event, "UPDATE"); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	filter := updateEventFilter(&event)

	if len(filter) == 0 {
		http.Error(w, response.ErrorMessages[response.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := eventController.Update(filter, params["id"]); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Event", response.Update))
}

func AddPlaylistToEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var playlistId string
	params := mux.Vars(r)

	if err := json.NewDecoder(r.Body).Decode(&playlistId); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.AddPlaylistToEvent(params["id"], &playlistId); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Create))
}

func RemovePlaylistFromEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := eventController.RemovePlaylistFromEvent(params["id"]); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Delete))
}

func UpdateStatusOfEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var status string
	params := mux.Vars(r)

	if err := json.NewDecoder(r.Body).Decode(&status); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if err := eventController.UpdateStatus(params["id"], &status); err != response.Ok {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Status", response.Update))
}
