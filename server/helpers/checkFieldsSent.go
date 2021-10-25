package helpers

import (
	"reflect"
	"server/model"
	"server/response"

	"go.mongodb.org/mongo-driver/bson"
)

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

func CheckPlaylistBlacklistedFields(playlist *model.Playlist) int {
	if playlist.Songs != nil || playlist.Guests != nil || playlist.Has_event {
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

		if key.String() == "avatar" || key.String() == "password" {
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

				for iter.Next() {
					key := iter.Key()
					value := iter.Value()

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

			if res := CheckUserPreferences(new_preferences); res != response.Ok {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "visibility" {
			if _, ok := value.Interface().(interface{}); !ok {
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
					return bson.M{}
				}
			}

			if count != 5 {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else {
			return bson.M{}
		}
	}

	return filter
}

func UpdatePlaylistFilter(doc interface{}) bson.M {
	filter := bson.M{}
	v := reflect.ValueOf(doc)

	iter := v.MapRange()

	for iter.Next() {
		key := iter.Key()
		value := iter.Value()

		if key.String() == "name" {
			if name, ok := value.Interface().(string); !ok {
				return bson.M{}
			} else if name == "" {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "status" {
			if status, ok := value.Interface().(string); !ok {
				return bson.M{}
			} else if status != "public" && status != "private" {
				return bson.M{}
			}

			filter[key.String()] = value.Interface()
		} else if key.String() == "guests" {
			if _, ok := value.Interface().([]interface{}); !ok {
				return bson.M{}
			}

			for _, value := range value.Interface().([]interface{}) {
				v := reflect.ValueOf(value)
				iter := v.MapRange()

				for iter.Next() {
					key := iter.Key()
					value := iter.Value()

					if key.String() == "id" {
						if _, ok := value.Interface().(string); !ok {
							return bson.M{}
						}
					} else if key.String() == "contributor" {
						if _, ok := value.Interface().(bool); !ok {
							return bson.M{}
						}
					} else {
						return bson.M{}
					}
				}
			}

			filter[key.String()] = value.Interface()
		} else {
			return bson.M{}
		}
	}

	return filter
}

func Get_Old_And_New_friend(fields bson.M, friends []model.Friend, old_friend *[]string, new_friend *[]string) bool {
	var ok bool

	for _, v := range friends {
		*old_friend = append(*old_friend, v.Id)
	}

	for k, v := range fields {
		if k == "friends" {
			ok = true

			for _, v := range reflect.ValueOf(v).Interface().([]interface{}) {
				v := reflect.ValueOf(v)
				iter := v.MapRange()

				for iter.Next() {
					key := iter.Key()
					value := iter.Value()

					if key.String() == "id" {
						*new_friend = append(*new_friend, value.Interface().(string))
					}
				}
			}
		}
	}

	return ok
}

func CheckNewFriend(old_friend []string, new_friend []string) int {
	for _, new := range new_friend {
		check := false

		for _, old := range old_friend {
			if new == old {
				check = true
			}
		}

		if !check {
			return response.Unauthorized
		}
	}

	return response.Ok
}

func Get_Friend_To_Remove(old_friend []string, new_friend []string) []string {
	var friend_to_remove []string

	for _, old := range old_friend {
		check := false

		for _, new := range new_friend {
			if old == new {
				check = true
			}
		}

		if !check {
			friend_to_remove = append(friend_to_remove, old)
		}
	}

	return friend_to_remove
}

func CheckFriendsField(fields bson.M, user *model.User, friend_to_remove *[]string) int {
	var old_friend []string
	var new_friend []string

	if ok := Get_Old_And_New_friend(fields, user.Friends, &old_friend, &new_friend); ok {
		if CheckNewFriend(old_friend, new_friend) != response.Ok {
			return response.Unauthorized
		}

		*friend_to_remove = Get_Friend_To_Remove(old_friend, new_friend)
	}

	return response.Ok
}
