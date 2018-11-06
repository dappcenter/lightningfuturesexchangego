package keys

import (
	"io/ioutil"
	"log"
	"os"
)

const (
	privKeyPath = "/config/keys/app.rsa"
	pubKeyPath  = "/config/keys/app.rsa.pub"
)

func GetKeys() ([]byte, []byte) {
	var err error
	pwd, _ := os.Getwd()

	SignKey, err := ioutil.ReadFile(pwd + privKeyPath)
	if err != nil {
		log.Fatal("Error reading private key")
	}

	VerifyKey, err := ioutil.ReadFile(pwd + pubKeyPath)
	if err != nil {
		log.Fatal("Error reading public key")
	}

	return SignKey, VerifyKey
}
