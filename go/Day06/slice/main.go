package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello raza")

	// example1()
	// example2()
	// example3()
	// example4()
	// example5()
	// example6()

	// example7()
	example8()

}

func example8() {
	var nums []int

	for i := 0; i <= 257; i++ {
		nums = append(nums, i)
		printCapInt(nums)
	}

	for _, num := range []int{2, 3, 4, 5} {
		fmt.Println(num)
	}

}

func example7() {
	sli1 := []int{1, 2, 3}
	sli1 = append(sli1, 4, 234, 234)
	sli2 := append(sli1, 6)

	sli1[0] = 10
	fmt.Println(sli1, sli2)

}

func example6() {
	num1 := make([]int, 0, 10)
	if num1 == nil {
		fmt.Print("---> ni;l")
	}
	for i, v := range num1 {
		fmt.Printf("num1[%d]: %d\n", i, v)
	}

	// printCapInt(num1)

	matrix := [][]int{
		[]int{1, 2, 3},
		[]int{1, 2, 3},
	}

	fmt.Println(matrix)
}

func example5() {
	var arr [2]string
	// if arr == nil {
	// 	fmt.Println("nill")
	// }

	for i, v := range arr {
		fmt.Printf("arr[%d]: '%s'\n", i, v)
	}
}

func example4() {
	num1 := []string{"a", "b", "c", "d", "e"}
	printCap(num1)

	num1 = num1[1:4]
	printCap(num1)

	num1 = num1[0:2]
	printCap(num1)

	fmt.Println(num1[0])
	num1[1] = "z"
	printCap(num1)

	// num1 = num1[0]
	// printCap(num1)

}

func printCap(a []string) {
	fmt.Println("cap:", cap(a), "len:", len(a), "-->", a)
}

func printCapInt(a []int) {
	fmt.Println("cap:", cap(a), "len:", len(a), "-->", a)
}

func example2() {

	num1 := []int{1, 2, 3, 4, 5}
	num2 := append(num1, 3)
	num1[2] = 10
	fmt.Println(num1, num2)

	fmt.Println("----->", cap(num1), cap(num2))

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
