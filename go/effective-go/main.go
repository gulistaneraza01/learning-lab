package main

import (
	"bytes"
	"fmt"
)

func main() {
	fmt.Println("hello Raza")

	// go have default fromatter
	// for export use Uppercase of first leter
	// use package name maningful
	// interface name have sufix with -er
	// identifier name are follow Camalcase
	// same package i can err var multiple places
	// new to create deafult value of type data always return to pointer to value
	// make() is used for -> slice, map, channel

	example4()
}

type User struct {
	Name string
}

func example4() {

	user1 := new(User) // return pointer to user1 variable
	fmt.Println(user1)
	var buf bytes.Buffer
	fmt.Fprintf(&buf, "this goes into buf, not the screen\n")
	// fmt.Fprintf(&buf, "this goes into buf, not the screen\n")
	// nothing printed to terminal here
	fmt.Println("only this line appears:", buf.String())
}

var name = "raza"

func init() {
	fmt.Print("first runs this fucntion to set initial state after file level variable created", name)
}
