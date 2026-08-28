package main

import "fmt"

func main() {
	fmt.Println("raza")

	example()

}

func example() {

	arr := [2]string{"hello", "raza"}

	var arr1 [3]int
	var slice []string

	arr1[1] = 2
	arr1[2] = 23

	arr[1] = "gulistane"
	fmt.Println(arr, len(arr1), slice)

}
