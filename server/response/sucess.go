package response

const (
	Create = iota
	Update
	Delete
	Connected
	Delegate
	Confirm
	Readed
	Sent
	Deny
)

var SuccessMessages = []string{
	" has been created.",
	" has been updated.",
	" has been deleted",
	" has been connected",
	" has been delegated",
	" has been confirmed",
	" has been readed",
	" has been sent",
	" has been deny",
}

func GetSuccessMessage(fieldName string, sucessIndex int) string {
	return fieldName + SuccessMessages[sucessIndex]
}
