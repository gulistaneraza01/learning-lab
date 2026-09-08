package main

import "fmt"

func main() {
	fmt.Println("hello raza")

	example()

}

func example() {

	numbers := []int{20, 39, 45, 35}

	names := []string{"a", "b", "c"}

	fmt.Println(indexNum(numbers, 35))
	fmt.Println(indexStr(names, "c"))
	fmt.Println(indexStr(names, "x"))
	fmt.Println(index(numbers, 35))
	fmt.Println(index(names, "c"))
	fmt.Println(index(names, "x"))

}

func index[T comparable](arr []T, ele T) int {
	for i, value := range arr {
		if value == ele {
			return i
		}
	}
	return -1
}

func indexNum(arr []int, ele int) int {

	for i, value := range arr {
		if value == ele {
			return i
		}
	}
	return -1
}

func indexStr(arr []string, ele string) int {

	for i, value := range arr {
		if value == ele {
			return i
		}
	}
	return -1
}
