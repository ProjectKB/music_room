package helpers

import (
	"server/model"
	"server/response"
)

// TODO Develop this logic for empty fields and others (the purpose is to refacto controllers/middlewares)

func CheckUserBlacklistedFields(user *model.User) int {
	if user.Friends != nil || user.Events != nil {
		return response.Unauthorized
	}

	return response.Ok
}

func CheckEventBlacklistedFields(event *model.Event, action string) int {
	if action == "UPDATE" && (event.Owner_id != "" || event.Playlist_id != "") {
		return response.Unauthorized
	}

	return response.Ok
}

func CheckPlaylistBlacklistedFields(playlist *model.Playlist, origin string) int {
	if origin == "playlist" && (playlist.Songs != nil || playlist.Guests != nil || playlist.Has_event) {
		return response.Unauthorized
	} else if origin == "update" && (playlist.Songs != nil || playlist.Has_event || playlist.Owner_id != "") {
		return response.Unauthorized
	}

	return response.Ok
}
