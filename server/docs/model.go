// User represents the user for this application
//
// A user is the security principal for this application.
// It's also used as one of main axes for reporting.
//
// A user can have friends with whom they can share what they like.
//
// swagger:model
type User struct {
    // the id for this user
    //
    // required: true
    // min: 1
    ID int64 `json:"id"`

    // the name for this user
    // required: true
    // min length: 3
    Name string `json:"name"`

    // the email address for this user
    //
    // required: true
    // example: user@provider.net
    Email strfmt.Email `json:"login"`

    // the friends for this user
    //
    // Extensions:
    // ---
    // x-property-value: value
    // x-property-array:
    //   - value1
    //   - value2
    // x-property-array-obj:
    //   - name: obj
    //     value: field
    // ---
    Friends []User `json:"friends"`
}
package docs