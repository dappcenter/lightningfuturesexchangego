package authMiddlewareCreator

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"time"

	"../helpers"
	"../keys"
	"../types"

	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func CreateMiddleware(db *sql.DB) *jwt.GinJWTMiddleware {
	SignKey, _ := keys.GetKeys()

	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "",
		Key:         SignKey,
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: "id",
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*types.User); ok {
				return jwt.MapClaims{
					"id": v.Username,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &types.User{
				Username: claims["id"].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			login := types.UsernamePasswordTwoFactorAuthenticationCode{}

			if c.Bind(&login) != nil {
				c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest})
				return nil, errors.New("UnknownError")
			}

			var userId int
			var password string
			var twoFactorAuthenticationToken string

			row := db.QueryRow("SELECT userId, password, twoFactorAuthenticationToken FROM User WHERE username=?", login.Username)
			switch err := row.Scan(&userId, &password, &twoFactorAuthenticationToken); err {
			case sql.ErrNoRows:
				return nil, errors.New("UsernameNotFound")
			case nil:
				if !helpers.ComparePasswords(password, []byte(login.Password)) {
					return nil, errors.New("IncorrectPassword")
				}

				return &types.User{
					UserId:   userId,
					Username: login.Username,
				}, nil
			default:
				return nil, errors.New("UnknownError")
			}
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			return true
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	return authMiddleware
}
