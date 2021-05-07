package router

import (
	"github.com/gorilla/mux"

	middleware "server/system/middleware"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/users", middleware.ReadAllUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.ReadOneUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.DeleteOneUser).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/users", middleware.CreateOneUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/{id}", middleware.UpdateOneUser).Methods("PUT", "OPTIONS")

	router.HandleFunc("/playlists", middleware.ReadAllPlaylist).Methods("GET", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.ReadOnePlaylist).Methods("GET", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.DeleteOnePlaylist).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/playlists", middleware.CreateOnePlaylist).Methods("POST", "OPTIONS")
	router.HandleFunc("/playlists/{id}", middleware.UpdateOnePlaylist).Methods("PUT", "OPTIONS")

	router.HandleFunc("/events", middleware.ReadAllEvent).Methods("GET", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.ReadOneEvent).Methods("GET", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.DeleteOneEvent).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/events", middleware.CreateOneEvent).Methods("POST", "OPTIONS")
	router.HandleFunc("/events/{id}", middleware.UpdateOneEvent).Methods("PUT", "OPTIONS")

	router.HandleFunc("/authorizations", middleware.ReadAllAuthorization).Methods("GET", "OPTIONS")
	router.HandleFunc("/authorizations/{id}", middleware.ReadOneAuthorization).Methods("GET", "OPTIONS")
	router.HandleFunc("/authorizations/{id}", middleware.DeleteOneAuthorization).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/authorizations/{id}", middleware.UpdateOneAuthorization).Methods("PUT", "OPTIONS")
	router.HandleFunc("/authorizations/addGuest/{id}", middleware.AddGuestToAuthorization).Methods("PUT", "OPTIONS")

	// TODO refacto
	
	return router
}
