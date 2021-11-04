# Music Room API

You'll find below informations about models and endpoints.

<details>

<summary>USER</summary>

### MODEL 
Name | Type | Value
 --- | --- | ---
**id** | `primitive.ObjectID`
**login** | `string`
**mail** | `string`
**password** | `string`
**token** | `string`
**preferences** | `string[]` | Rap FR, Rap US, Rock, Metal, Classic, Electro, Trance, Low-Fi, House
**friends** | `friend[]`
**events** | `string[]`
**notifications** | `string`
**visibility** | `Visibility`
**avatar** | `string`

#### Friend 
Name | Type
 --- | ---
**id** | `string`
**confirmed** | `bool`
**conversation** | `string`

#### Visibility 
Name | Type | Value
 --- | --- | ---
**login** | `string` | public/private/friends
**mail** | `string` | public/private/friends
**preferences** | `string` | public/private/friends
**friends** | `string` | public/private/friends
**avatar** | `string` | public/private/friends

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
`/users/friends/{id}` | **GET** | read every friends
`/users/conversations/{id}` | **GET** | read every conversations
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
**id** | `primitive.ObjectID`
**name** | `string`
**owner_id** | `string`
**status** | `string`
**songs** | `Song[]`
**guests** | `Guest[]`
**has_event** | `bool`

#### Song
Name | Type
 --- | ---
**id** | `string`
**name** | `string`
**picture** | `string`
**score** | `uint`

#### Guest
Name | Type
 --- | ---
**id** | `string`
**contributor** | bool

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
**id** | `primitive.ObjectID`
**name** | `string`
**owner_id** | `string`
**playlist_id** | `string`
**picture** | `string`
**start** | `string`
**end** | `string`
**status** | `string` | pending/ongoing/finished

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

<summary>NOTIFICATIONS</summary>

### MODEL
Name | Type
 --- | ---
**id** | `primitive.ObjectID`
**login** | `string`
**notifications** | `Notification[]`
**notifications_count** | `int`

#### Notification
Name | Type
 --- | ---
**Id** | `string`
**From** | `string`
**Content** | `string`
**Type** | `string`
**Readed** | `bool`

### ENDPOINTS
Route | Method | Utility
 --- | --- | ---
`/notifications` | **GET** | read every notifications
`/notifications/{id}` | **GET** | read one notification
`/notifications/readNotification/{id}` | **PUT** | read a notification
</details>

<details>

<summary>CONVERSATION</summary>

### MODEL
Name | Type
 --- | ---
**id** | `primitive.ObjectID`
**user_a** | `string`
**user_b** | `string`
**messages** | `Message[]`

#### Message
Name | Type
 --- | ---
**from** | `string`
**to** | `string`
**content** | `string`
**date** | `time.Time`
**success** | `bool`
</details>
