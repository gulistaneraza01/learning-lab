package main

import (
	"fmt"
)

func main() {
	// defer fmt.Println("in last")

	fmt.Println("Hello raza")

	// defer fmt.Println("first defer")
	defer example1()
}

func example1() {
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
}
