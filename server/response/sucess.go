package response

const (
	Create = iota
	Update
	Delete
	Connected
)

var SuccessMessages = []string{
	" has been created.",
	" has been updated.",
	" has been deleted",
	" has been connected",
}

func GetSuccessMessage(fieldName string, sucessIndex int) string {
	return fieldName + SuccessMessages[sucessIndex]
}
