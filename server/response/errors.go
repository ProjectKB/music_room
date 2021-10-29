package response

// TODO add enum to return good error code (middleware)

const (
	BddError = iota
	AlreadyExist
	MailAlreadyExist
	LoginAlreadyExist
	InvalidFormat
	FieldIsMissing
	UpdateEmpty
	Unauthorized
	Nonexistence
	FriendshipRequestDuplicated
	Ok
)

var ErrorMessages = []string{
	"Bdd Error.",
	"This record already exist.",
	"This mail already exist.",
	"This login already exist.",
	"Invalid format.",
	"There are some fields who can't be empty.",
	"You can't update without providing data.",
	"Nice try sweety.",
	"nonexistence",
	"You already ask this user for friendship.",
	"There are no mistakes.",
}
