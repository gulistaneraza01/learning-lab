package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello raza")

	// example()

	func1 := closure()
	fmt.Println(func1(0))
	fmt.Println(func1(1))
	fmt.Println(func1(2))
	fmt.Println(func1(3))
}

func closure() func(int) int {
	sum := 0
	return func(x int) int {
		sum += 1
		return sum
	}
}

func example() {

	sum := func(a, b int) int {
		return a + b
	}

	fmt.Println(sum(2, 3))
	fmt.Println(square(sum))
	// fmt.Println(square(sum(2, 3)))
}

func square(fn func(x, y int) int) int {
	return fn(3, 4)
}
