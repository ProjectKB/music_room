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
	"There are no mistakes.",
}
