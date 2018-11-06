package main

import (
	"regexp"

	"./authMiddlewareCreator"
	"./dbCreator"
	"./routerCreator"
)

var alphaNumericRegExp *regexp.Regexp

func main() {
	db := dbCreator.CreateDB()
	authMiddleware := authMiddlewareCreator.CreateMiddleware(db)
	router := routerCreator.CreateRouter(db, authMiddleware)
	router.Run(":3000")
}
