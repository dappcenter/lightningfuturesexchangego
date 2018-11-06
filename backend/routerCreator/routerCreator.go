package routerCreator

import (
	"database/sql"
	"net/http"
	"regexp"

	"../helpers"
	"../types"

	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

var alphaNumericRegExp *regexp.Regexp

func getUsernamePasswordFromRequest(usernamePassword *types.UsernamePassword, c *gin.Context) bool {
	if c.Bind(&usernamePassword) != nil {
		return false
	}

	if len(usernamePassword.Username) < 6 || len(usernamePassword.Password) < 8 || !alphaNumericRegExp.MatchString(usernamePassword.Username) {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest})
		return false
	}

	return true
}

func CreateRouter(db *sql.DB, authMiddleware *jwt.GinJWTMiddleware) *gin.Engine {
	alphaNumericRegExp, _ = regexp.Compile("^[a-z0-9_]+")

	router := gin.Default()

	// Serve the frontend
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	Register := func(c *gin.Context) {
		signUp := types.UsernamePassword{}
		if !getUsernamePasswordFromRequest(&signUp, c) {
			c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest})
			return
		}

		stmt, _ := db.Prepare("INSERT User SET username=?,password=?,twoFactorAuthenticationToken=?")
		_, err := stmt.Exec(signUp.Username, helpers.HashAndSalt([]byte(signUp.Password)), "")
		if err != nil {
			mysqlerr, ok := err.(*mysql.MySQLError)
			if ok && mysqlerr.Number == 1062 {
				c.JSON(http.StatusConflict, gin.H{"status": http.StatusConflict})
			}
			return
		}

		c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated})
	}

	helloHandler := func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		user, _ := c.Get("id")
		c.JSON(200, gin.H{
			"userID":   claims["id"],
			"userName": user.(*types.User).Username,
			"text":     "Hello World.",
		})
	}

	api := router.Group("/api")
	{
		api.POST("/register", Register)
		api.POST("/login", authMiddleware.LoginHandler)
		api.GET("/refresh_token", authMiddleware.RefreshHandler)
		api.Use(authMiddleware.MiddlewareFunc())
		{
			api.GET("/hello", helloHandler)
		}
	}
	return router
}
