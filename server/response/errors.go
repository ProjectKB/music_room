package response

const (
	BddError = iota 
	AlreadyExist 
	InvalidFormat
	FieldIsMissing
	UpdateEmpty
	Unauthorized
	None
)

var ErrorMessages = []string {
	"Bdd Error.",
	"This record already exist.",
	"Invalid format.",
	"There are some fields who can't be empty.",
	"You can't update without providing data.",
	"Nice try sweety.",
}
