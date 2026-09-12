package main

import (
	"fmt"
	"time"
)

func main() {
	// fmt.Println("hello raza")
	// example1("hello")

	// example1("raza")
	examples2()
}

func examples2() {
	nums := []int{6, 2, 4, 6}

	ch := make(chan int)

	go total(nums[:len(nums)/2], ch)

	go total(nums[len(nums)/2:], ch)

	a := <-ch
	b := <-ch
	fmt.Println(a, b)

}

func total(nums []int, ch chan int) {
	result := 0

	for _, num := range nums {
		result += num
	}

	ch <- result
}

func example1(str string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(str)
	}

}
