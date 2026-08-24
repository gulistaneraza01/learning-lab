package main

import "fmt"

func main() {
	fmt.Println("Hello Raza")
	example()
}

func example() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	i := 1
	for i <= 100 {
		fmt.Println("hello", i)
		i++
	}
	fmt.Println("sum=", sum)
}
