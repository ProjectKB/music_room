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

func CheckPlaylistBlacklistedFields(playlist *model.Playlist) int {
	if playlist.Owner_id != "" || playlist.Authorization_id != "" || playlist.Songs != nil {
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
