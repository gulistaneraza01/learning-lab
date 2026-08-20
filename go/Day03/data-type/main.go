package main

import (
	"fmt"
)

type User struct {
	ID       int
	Name     string
	Email    string
	IsActive bool
}

func main() {
	fmt.Println("hello raza")

	// user1 := User{ID: 1000, Name: "raza"}

	// a := 2
	// b := 3
	// answer := add(a, b)

	datatype()
}

var (
	name string = "raza"
)

const (
	Pi = 3.14
)

func datatype() {
	// var num1 int8 = 122
	// var num2 int8 = 122
	// total := num1 + num2

	// var num1 uint = 0

	var a int16 = 8
	b := int32(a)

	fmt.Println(b)

	const pi = 3.14
	fmt.Println(pi)

}

func add(a, b int) int {
	return a + b
}
