package main

import "fmt"

func main() {
	fmt.Println("Hello raza")

	example()
}

func example() {
	a := 1
	c := 6

	b := &a
	*b = 3
	fmt.Println(a, *b)

	b = &c
	fmt.Println(*b)
}
