package system

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	playlistController "server/controllers/playlistController"
	"server/model"
	"server/response"
	"strings"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllPlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var results []model.Playlist

	if err := playlistController.ReadAll(&results); err != response.None {
		fmt.Println(err, results)
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(results)
}

func ReadOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var result model.Playlist

	if err := playlistController.Read(params["id"], &result); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)

	if err := playlistController.Delete(params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Delete))
}

func CreateOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var playlist model.Playlist
	jsonErr := json.NewDecoder(r.Body).Decode(&playlist)

	if jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := playlistController.Create(&playlist); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Create))
}

func updatePlaylistFilter(doc *model.Playlist) bson.M {
	filter := bson.M{}
	default_picture := "path_to_default_picture"

	if doc.Picture == "" {
		doc.Picture = default_picture
	}

	v := reflect.ValueOf(*doc)
	typeOfS := v.Type()

	for i := 0; i < v.NumField(); i++ {
		if (typeOfS.Field(i).Name == "Name" || typeOfS.Field(i).Name == "Avatar") && v.Field(i).Interface() != "" {
			filter[strings.ToLower(typeOfS.Field(i).Name)] = v.Field(i).Interface()
		}
	}

	return filter
}

func UpdateOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var playlist model.Playlist
	params := mux.Vars(r)

	json.NewDecoder(r.Body).Decode(&playlist)
	filter := updatePlaylistFilter(&playlist)

	if len(filter) == 0 {
		http.Error(w, response.ErrorMessages[response.UpdateEmpty], http.StatusBadRequest)
		return
	} else if err := playlistController.Update(filter, params["id"]); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Playlist", response.Update))
}

func AddSongToPlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var song model.Song
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&song); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := playlistController.AddSong(params["id"], &song); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Song", response.Create))
}

func RemoveSongFromPlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var song model.Song
	params := mux.Vars(r)

	if jsonErr := json.NewDecoder(r.Body).Decode(&song); jsonErr != nil {
		http.Error(w, jsonErr.Error(), http.StatusBadRequest)
		return
	} else if err := playlistController.RemoveSong(params["id"], &song); err != response.None {
		http.Error(w, response.ErrorMessages[err], http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(response.GetSuccessMessage("Song", response.Delete))
}