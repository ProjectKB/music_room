package errors

const (
	BddError = iota 
	MailAlreadyExist 
	MailInvalidFormat
	FieldIsMissing
	UpdateEmpty
	None
)

var ErrorMessages = []string {
	"Bdd Error.",
	"This email already exist.",
	"Mail format is invalid.",
	"There are some fields who can't be empty.",
	"You can't update without providing data.",
}
