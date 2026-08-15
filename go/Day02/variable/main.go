package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello variable👋")

	testVar()
}

var newvar bool

// newvar := 2   it only support inside the function

func testVar() {
	var firstName, lastName string

	age := 20

	firstName = "gulistane"
	lastName = "raza"

	println("-->", firstName, lastName, age, newvar, "<--")
	fmt.Printf("%T\n", firstName)

	var com complex128 = (3 + 5i)
	var com2 complex128 = (2 - 4i)
	println(com + com2)
}

type key string

func createKey(name string) key {
	return key("EXAMPLE_CTX_" + name)
}

var (
	RequestCtxKey     = createKey("REQUEST")
	TransactionCtxKey = createKey("TRANSACTION")
	TenantCtxKey      = createKey("TENANT")
	LocaleCtxKey      = createKey("LOCALE")
	UserCtxKey        = createKey("USER")
	LogPropsCtxKey    = createKey("LOG_PROPS")
)
