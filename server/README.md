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

(*) mandatory field(s) when creating/updating

### ENDPOINTS 
Route | Method | Utility
 --- | --- | ---
`/users` | **GET** | return every users
`/users/{id}` | **GET** | return one user
`/users/{id}` | **POST** | create one user
`/users/{id}` | **PUT** | update one user
`/users/{id}` | **DELETE** | delete one user
`/users/addFriend/{id}` | **PUT** | add a friend to `friends` field
`/users/removeFriend/{id}` | **PUT** | remove a friend from `friends` field
`/users/addPlaylist/{id}` | **PUT** | add a playlist to `playlists` field
`/users/removePlaylist/{id}` | **PUT** | remove a playlist from `playlists` field
`/users/addEvent/{id}` | **PUT** | add an event to `events` field
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
**Id** | `primitive.ObjectID`
**Name*** | `string`
**Score** | `uint`

(*) mandatory field(s) when creating/updating

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/playlists` | **GET** | return every playlists
`/playlists/{id}` | **GET** | return one playlist
`/playlists/{id}` | **POST** | create one playlist
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
**Playlist_id** | `string`
**Picture** | `string`
**Start*** | `string`
**End*** | `string`
**Status** | `string` | pending/ongoing/finished

(*) mandatory field(s) when creating/updating

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/events` | **GET** | return every events
`/events/{id}` | **GET** | return one event
`/events/{id}` | **POST** | create one event
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
**Id** | `primitive.ObjectID`
**Name*** | `string`
**Contributor** | bool

(*) mandatory field(s) when creating/updating

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/authorizations` | **GET** | return every authorizations
`/authorizations/{id}` | **GET** | return one authorization
`/authorizations/{id}` | **POST** | create one authorization
`/authorizations/{id}` | **DELETE** | delete one authorization
`/authorizations/updateStatus/{id}` | **PUT** | update authorization status
`/authorizations/addGuest/{id}` | **PUT** | add a guest to `guests` field
`/authorizations/removeGuest/{id}` | **PUT** | remove a guest from `guests` field
</details>
