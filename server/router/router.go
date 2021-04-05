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
	return router
}
