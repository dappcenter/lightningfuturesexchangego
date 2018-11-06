package types

type UsernamePasswordTwoFactorAuthenticationCode struct {
	Username                    string `json:"username" binding:"required"`
	Password                    string `json:"password"`
	TwoFactorAuthenticationCode string `json:"twoFactorAuthenticationCode"`
}
