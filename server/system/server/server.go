package system

import (
	"fmt"
	"log"
	"net/http"
	"server/router"
)

func LaunchServer() {
	r := router.Router()

	fmt.Println("Server is running on port :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
