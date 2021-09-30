package helpers

import (
	"fmt"
	"reflect"
	"server/model"
	"server/response"

	"go.mongodb.org/mongo-driver/bson"
)

// TODO Develop this logic for empty fields and others (the purpose is to refacto controllers/middlewares)

func CheckUserPreferences(new_preferences []string) int {
	var check bool
	music_preferences := [9]string{"Rap FR", "Rap US", "Rock", "Metal", "Classic", "Electro", "Trance", "Low-Fi", "House"}

	for _, new_preference := range new_preferences {
		check = false

		for _, preference := range music_preferences {
			if new_preference == preference {
				check = true
			}
		}
		if !check {
			return response.Unauthorized
		}
	}

	return response.Ok
}

func CheckUserBlacklistedFields(user *model.User) int {
	if user.Friends != nil || user.Events != nil || user.Token != "" || user.Notifications != nil || user.Notifications_count != 0 || user.Avatar != "" || user.Preferences != nil {
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

func UpdateUserFilter(doc interface{}) bson.M {
	filter := bson.M{}
	v := reflect.ValueOf(doc)

	iter := v.MapRange()

	for iter.Next() {
		key := iter.Key()
		value := iter.Value()

		if key.String() == "login" || key.String() == "mail" || key.String() == "password" || key.String() == "avatar" {
			if _, ok := value.Interface().(string); !ok {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "friends" {
			if _, ok := value.Interface().([]interface{}); !ok {
				return bson.M{}
			}

			for _, value := range value.Interface().([]interface{}) {
				v := reflect.ValueOf(value)
				iter := v.MapRange()
				count := 0

				for iter.Next() {
					key := iter.Key()
					value := iter.Value()
					count += 1

					if key.String() == "id" {
						if _, ok := value.Interface().(string); !ok {
							return bson.M{}
						}
					} else if key.String() == "confirmed" {
						if _, ok := value.Interface().(bool); !ok {
							return bson.M{}
						}
					} else {
						return bson.M{}
					}
				}

				if count != 2 {
					return bson.M{}
				}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "preferences" {
			if _, ok := value.Interface().([]interface{}); !ok {
				return bson.M{}
			}

			var new_preferences []string

			for _, value := range value.Interface().([]interface{}) {
				if new_preference, ok := value.(string); !ok {
					return bson.M{}
				} else {
					new_preferences = append(new_preferences, new_preference)
				}
			}

			if len(new_preferences) == 0 {
				return bson.M{}
			} else if res := CheckUserPreferences(new_preferences); res != response.Ok {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "visibility" {
			if _, ok := value.Interface().(interface{}); !ok {
				fmt.Println("A")
				return bson.M{}
			}

			v := reflect.ValueOf(value.Interface())
			iter := v.MapRange()
			count := 0

			for iter.Next() {
				key := iter.Key()
				value := iter.Value()
				count += 1

				if key.String() == "login" || key.String() == "mail" || key.String() == "preferences" || key.String() == "friends" || key.String() == "avatar" {
					if _, ok := value.Interface().(string); !ok || (value.Interface() != "public" && value.Interface() != "private" && value.Interface() != "friends") {
						return bson.M{}
					}
				} else {
					fmt.Println("B")
					return bson.M{}
				}
			}

			if count != 5 {
				fmt.Println(count)
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else {
			return bson.M{}
		}
	}

	return filter
}
