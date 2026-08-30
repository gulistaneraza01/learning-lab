package main

import "fmt"

func main() {
	fmt.Println("raza")

	var arr1 [3]string
	fmt.Println("->", arr1)

	arr2 := [2]string{"raza"}
	arr2[1] = "a"

	example()

}

func example() {

	arr := [2]string{"hello", "raza"}
	fmt.Println(arr[0:2])

	var arr1 [3]int
	var slice []string

	arr1[1] = 2
	arr1[2] = 23

	arr[1] = "gulistane"
	fmt.Println(arr, len(arr1), slice)

}
