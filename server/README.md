# Music Room API

You'll find below informations about models and endpoints.

<details>

<summary>USER</summary>

### MODEL 
Name | Type
 --- | ---
**Id** | `primitive.ObjectID`
**Login** | `string`
**Mail** | `string`
**Password** | `string`
**Token** | `string`
**Preferences** | `string[]` (Rap FR, Rap US, Rock, Metal, Classic, Electro, Trance, Low-Fi, House)
**Friends** | `friend[]`
**Events** | `string[]`
**Avatar** | `string`

#### Friend 
Name | Type
 --- | ---
**Id** | `string`
**Password** | `string`

#### Visibility 
Name | Type
 --- | ---
**Login** | `string` (public | private | friends)
**Mail** | `string` (public | private | friends)
**Preferences** | `string` (public | private | friends)
**Friend** | `string` (public | private | friends)
**Avatar** | `string` (public | private | friends)

#### Notification 
Name | Type
 --- | ---
**From** | `string`
**Content** | `string`
**Readed** | `boolean`

### ENDPOINTS 
Route | Method | Utility
 --- | --- | ---
`/users` | **GET** | read every users
`/users/{id}` | **GET** | read one user
`/users` | **POST** | create one user
`/users/{id}` | **PUT** | update one user
`/users/{id}` | **DELETE** | delete one user
`/users/login` | **POST** | check user validity and return token
`/users/define` | **POST** | read a token a return the corresponding user
`/users/addFriend/{id}` | **PUT** | add a friend to `friends` field and send a notification to this friend
`/users/confirmFriend/{id}` | **PUT** | confirm a friend
`/users/readNotification/{id}` | **PUT** | read a notification
`/users/friends/{id}` | **GET** | read every friends
`/users/removeFriend/{id}` | **PUT** | remove a friend from `friends` field
`/users/addEvent/{id}` | **PUT** | add an event to `events` field
`/users/events/{id}` | **GET** | read every events
`/users/removeEvent/{id}` | **PUT** | remove an event from `events` field
`/users/searchUsers/{id}` | **POST** | return every `users` according to `search query` who are not `friends`
</details>

<details>

<summary>PLAYLIST</summary>

### MODEL
Name | Type
 --- | ---
**Id** | `primitive.ObjectID`
**Name** | `string`
**Owner_id** | `string`
**Status** | `string`
**Songs** | `Song[]`
**Guests** | `Guest[]`
**Has_event** | `bool`


#### Song
Name | Type
 --- | ---
**Id** | `string`
**Name** | `string`
**Picture** | `string`
**Score** | `uint`

#### Guest
Name | Type
 --- | ---
**Id** | `string`
**Contributor** | bool

(*) mandatory fields

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/playlists` | **GET** | read every playlists
`/playlists/{id}` | **GET** | read one playlist
`/playlists` | **POST** | create one playlist
`/playlists/searchPlaylist` | **POST** | search in playlist collection
`/playlists/searchSong` | **POST** | search song in playlist
`/playlists/{id}` | **PUT** | update one playlist
`/playlists/{id}` | **DELETE** | delete one playlist
`/playlists/addSong/{id}` | **PUT** | add a song to `songs` field
`/playlists/removeSong/{id}` | **PUT** | remove a song from `songs` field
`/playlists/addGuest/{id}` | **PUT** | add a guest to `guests` field
`/playlists/removeGuest/{id}` | **PUT** | remove a guest from `guests` field
`/playlists/guests/{id}` | **GET** | read every guests from one playlist
`/playlists/delegate/{id}` | **PUT** | delegate playlist to another user
</details>

<details>

<summary>EVENT</summary>

### MODEL
Name | Type | Value
 --- | --- | ---
**Id** | `primitive.ObjectID`
**Name** | `string`
**Owner_id** | `string`
**Playlist_id** | `string`
**Picture** | `string`
**Start** | `string`
**End** | `string`
**Status** | `string` | pending/ongoing/finished

(*) mandatory fields

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/events` | **GET** | read every events
`/events/{id}` | **GET** | read one event
`/events` | **POST** | create one event
`/events/searchEvent` | **POST** | search in event collection
`/events/{id}` | **PUT** | update one event
`/events/{id}` | **DELETE** | delete one event
`/events/addPlaylist/{id}` | **PUT** | add a playlist to `playlists` field
`/events/removePlaylist/{id}` | **PUT** | remove a playlist from `playlists` field
`/events/removeUpdateStatus/{id}` | **PUT** | update `status` field
</details>
