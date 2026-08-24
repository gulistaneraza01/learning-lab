package main

import "fmt"

func main() {
	fmt.Println("hello raza")
	example(0)
	example2()
}

func example(a float64) {

	if a >= 1 {
		fmt.Println("greater than 1")

	} else if a == 0 {
		fmt.Println("equal to 0")

	} else {
		fmt.Println("less than 1")
	}
}

func example2() {
	if i := -1; i == 0 {
		fmt.Println("i value is zere", i)
	} else if i > 0 {
		fmt.Println("greater than 0")
	} else {
		fmt.Println("less than zero")
	}

}
