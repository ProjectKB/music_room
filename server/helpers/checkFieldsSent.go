package helpers

import (
	"server/model"
	"server/response"
)

// TODO Develop this logic for empty fields and others (the purpose is to refacto controllers/middlewares)

func CheckUserBlacklistedFields(user *model.User) int {
	if user.Friends != nil || user.Playlists != nil || user.Events != nil {
		return response.Unauthorized
	}

	return response.Ok
}

func CheckEventBlacklistedFields(event *model.Event, action string) int {
	if action == "CREATE" && event.Owner_id != "" {
		return response.Unauthorized
	} else if action == "UPDATE" && (event.Owner_id != "" || event.Playlist_id != "") {
		return response.Unauthorized
	}

	return response.Ok
}

func CheckPlaylistBlacklistedFields(playlist *model.Playlist) int {
	if playlist.Authorization_id != "" || playlist.Songs != nil {
		return response.Unauthorized
	}

	return response.Ok
}

func CheckAuthorizationBlacklistedFields(authorization *model.Authorization) int {
	if authorization.Owner_id != "" || authorization.Guests != nil {
		return response.Unauthorized
	}

	return response.Ok
}
