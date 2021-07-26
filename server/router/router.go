package router

import (
	"github.com/gorilla/mux"

	"server/middleware"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/users", middleware.ReadAllUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.ReadOneUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.DeleteOneUser).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/users", middleware.CreateOneUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/define", middleware.DefineUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/login" ,middleware.LoginUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.UpdateOneUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/addFriend/{id}", middleware.AddFriendToUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/friends/{id}", middleware.ReadUserFriends).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/removeFriend/{id}", middleware.RemoveFriendFromUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/addPlaylist/{id}", middleware.AddPlaylistToUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/playlists/{id}", middleware.ReadUserPlaylists).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/removePlaylist/{id}", middleware.RemovePlaylistFromUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/addEvent/{id}", middleware.AddEventToUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/events/{id}", middleware.ReadUserEvents).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/removeEvent/{id}", middleware.RemoveEventFromUser).Methods("PUT", "OPTIONS")

	router.HandleFunc("/playlists", middleware.ReadAllPlaylist).Methods("GET", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.ReadOnePlaylist).Methods("GET", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.DeleteOnePlaylist).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/playlists", middleware.CreateOnePlaylist).Methods("POST", "OPTIONS")
	router.HandleFunc("/playlists/searchPlaylist", middleware.SearchPlaylist).Methods("POST", "OPTIONS")
	router.HandleFunc("/playlists/searchSong/{id}", middleware.SearchSong).Methods("POST", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.UpdateOnePlaylist).Methods("PUT", "OPTIONS")
	router.HandleFunc("/playlists/addSong/{id}", middleware.AddSongToPlaylist).Methods("PUT", "OPTIONS")
	router.HandleFunc("/playlists/removeSong/{id}", middleware.RemoveSongFromPlaylist).Methods("PUT", "OPTIONS")

	router.HandleFunc("/events", middleware.ReadAllEvent).Methods("GET", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.ReadOneEvent).Methods("GET", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.DeleteOneEvent).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/events", middleware.CreateOneEvent).Methods("POST", "OPTIONS")
	router.HandleFunc("/events/searchEvent", middleware.SearchEvent).Methods("POST", "OPTIONS")
	router.HandleFunc("/events/searchEventStatus", middleware.SearchEventStatus).Methods("POST", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.UpdateOneEvent).Methods("PUT", "OPTIONS")
	router.HandleFunc("/events/addPlaylist/{id}", middleware.AddPlaylistToEvent).Methods("PUT", "OPTIONS")
	router.HandleFunc("/events/removePlaylist/{id}", middleware.RemovePlaylistFromEvent).Methods("PUT", "OPTIONS")
	router.HandleFunc("/events/updateStatus/{id}", middleware.UpdateStatusOfEvent).Methods("PUT", "OPTIONS")

	router.HandleFunc("/authorizations", middleware.ReadAllAuthorization).Methods("GET", "OPTIONS")
	router.HandleFunc("/authorizations/{id}", middleware.ReadOneAuthorization).Methods("GET", "OPTIONS")
	router.HandleFunc("/authorizations/{id}", middleware.DeleteOneAuthorization).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/authorizations/updateStatus/{id}", middleware.UpdateAuthorizationStatus).Methods("PUT", "OPTIONS")
	router.HandleFunc("/authorizations/addGuest/{id}", middleware.AddGuestToAuthorization).Methods("PUT", "OPTIONS")
	router.HandleFunc("/authorizations/guests/{id}", middleware.ReadAuthorizationGuests).Methods("GET", "OPTIONS")
	router.HandleFunc("/authorizations/removeGuest/{id}", middleware.RemoveGuestFromAuthorization).Methods("PUT", "OPTIONS")

	// TODO refacto

	return router
}
