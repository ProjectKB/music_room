package system

import (
	"encoding/json"
	"net/http"
	playlistController "server/controllers/playlistController"
	"server/model"

	"github.com/gorilla/mux"
)

func ReadAllPlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	response := playlistController.ReadAll()
	json.NewEncoder(w).Encode(response)
}

func ReadOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	response := playlistController.Read(params["id"])
	json.NewEncoder(w).Encode(response)
}

func DeleteOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	playlistController.Delete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func CreateOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var playlist model.Playlist
	json.NewDecoder(r.Body).Decode(&playlist)
	playlistController.Create(&playlist)
	json.NewEncoder(w).Encode(playlist)
}

func UpdateOnePlaylist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var playlist model.Playlist
	params := mux.Vars(r)
	json.NewDecoder(r.Body).Decode(&playlist)
	playlistController.Update(&playlist, params["id"])
	json.NewEncoder(w).Encode(playlist)
}
