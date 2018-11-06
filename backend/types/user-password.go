package types

type UsernamePassword struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password"`
}
