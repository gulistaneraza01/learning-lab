package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello raza")

	// example1()
	example2()
	// example3()
}

func example2() {

	num1 := []int{1, 2, 3, 4, 5}
	num2 := append(num1, 3)
	// num2[3] = 10

	strat := num1[1:]
	end := num1[:2]

	fmt.Println(strat, end)
	fmt.Println(num1, num2)

}

type a struct {
	x int
	y int
}

func example3() {
	s := []a{{1, 2}, {2, 3}}

	fmt.Println(s)
}

func example1() {

	arr1 := [4]string{"apple", "banana", "grapes", "mango "}
	fmt.Println("arr1 value->", arr1)

	sli1 := arr1[0:2]
	sli2 := arr1[1:3]
	sli1[1] = "new"

	fmt.Println(sli1, sli2, arr1)
}
