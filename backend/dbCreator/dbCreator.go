package dbCreator

import (
	"database/sql"
	"io/ioutil"
	"log"
	"os"
)

func CreateDB() *sql.DB {
	var err error
	pwd, _ := os.Getwd()
	connectionString, err := ioutil.ReadFile(pwd + "/config/connection-string.txt")
	if err != nil {
		log.Fatal("Error reading private key")
	}
	db, err := sql.Open("mysql", string(connectionString))
	if err != nil {
		log.Panic(err)
	}
	return db
}
