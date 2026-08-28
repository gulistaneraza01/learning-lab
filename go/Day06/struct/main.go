package main

import "fmt"

func main() {
	fmt.Println("Hello raza")

	example()
}

type myInt int

var num1 myInt = 2

type Gender uint8

const (
	MALE Gender = iota + 1
	FEMALE
)

type Person struct {
	Name   string
	Age    int
	Gender Gender
}

func (g Gender) String() string {
	switch g {
	case MALE:
		return "MALE"
	case FEMALE:
		return "FEMALE"
	default:
		return "UNKNOWN"
	}
}

type Vertex struct {
	X int
	Y int
}

func example() {
	p1 := Person{"raza", 20, MALE}
	p1.Gender = FEMALE
	a := Vertex{}             //empty
	b := Vertex{1, 3}         //both value
	c := Vertex{X: 1}         //single value
	d := Vertex{Y: 9}         //single value
	pointer2 := &Vertex{1, 8} //pointer vertex to pointer

	pointer := &b
	pointer.X = 10
	fmt.Println(pointer.X)
	fmt.Println(pointer2)
	fmt.Println(p1, a, b, c, d)
}
