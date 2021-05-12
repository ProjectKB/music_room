package response

const (
	Create = iota
	Update
	Delete
)

var SuccessMessages = []string{
	" has been created.",
	" has been updated.",
	" has been deleted",
}

func GetSuccessMessage(fieldName string, sucessIndex int) string {
	return fieldName + SuccessMessages[sucessIndex]
}
