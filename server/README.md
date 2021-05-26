# Music Room API

You'll find below informations about models and endpoints.

<details>

<summary>USER</summary>

### MODEL 
Name | Type
 --- | ---
**Id** | `primitive.ObjectID`
**Login*** | `string`
**Mail*** | `string`
**Password*** | `string`
**Friends** | `string[]`
**Events** | `string[]`
**Playlists** | `string[]`
**Avatar** | `string`

(*) mandatory fields

### ENDPOINTS 
Route | Method | Utility
 --- | --- | ---
`/users` | **GET** | read every users
`/users/{id}` | **GET** | read one user
`/users` | **POST** | create one user
`/users/{id}` | **PUT** | update one user
`/users/{id}` | **DELETE** | delete one user
`/users/addFriend/{id}` | **PUT** | add a friend to `friends` field
`/users/friends/{id}` | **GET** | read every friends
`/users/removeFriend/{id}` | **PUT** | remove a friend from `friends` field
`/users/addPlaylist/{id}` | **PUT** | add a playlist to `playlists` field
`/users/playlists/{id}` | **GET** | read every playlistss
`/users/removePlaylist/{id}` | **PUT** | remove a playlist from `playlists` field
`/users/addEvent/{id}` | **PUT** | add an event to `events` field
`/users/events/{id}` | **GET** | read every events
`/users/removeEvent/{id}` | **PUT** | remove an event from `events` field
</details>

<details>

<summary>PLAYLIST</summary>

### MODEL
Name | Type
 --- | ---
**Id** | `primitive.ObjectID`
**Name*** | `string`
**Owner_id** | `string`
**Authorization_id** | `string`
**Songs** | `Song[]`
**Picture** | `string`

#### Song
Name | Type
 --- | ---
**Id** | `string`
**Name*** | `string`
**Score** | `uint`

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
</details>

<details>

<summary>EVENT</summary>

### MODEL
Name | Type | Value
 --- | --- | ---
**Id** | `primitive.ObjectID`
**Name*** | `string`
**Owner_id** | `string`
**Playlist_id** | `string`
**Picture** | `string`
**Start*** | `string`
**End*** | `string`
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

<details>

<summary>AUTHORIZATION</summary>

### MODEL
Name | Type | Value
 --- | --- | ---
**Id** | `primitive.ObjectID`
**Owner_id** | `string`
**Status** | `string` | public/private
**Guest** | `Guest[]`

#### Guest
Name | Type
 --- | ---
**Id** | `string`
**Contributor** | bool

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/authorizations` | **GET** | read every authorizations
`/authorizations/{id}` | **GET** | read one authorization
`/authorizations` | **POST** | create one authorization
`/authorizations/{id}` | **DELETE** | delete one authorization
`/authorizations/updateStatus/{id}` | **PUT** | update authorization status
`/authorizations/addGuest/{id}` | **PUT** | add a guest to `guests` field
`/authorization/guests/{id}` | **GET** | read every guests
`/authorizations/removeGuest/{id}` | **PUT** | remove a guest from `guests` field
</details>
