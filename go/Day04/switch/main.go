package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Println("hello raza")

	fmt.Println("runtime os =", runtime.GOOS)

	example1()
	example2() //if-elseif-elseif
}

func example1() {
	switch day := 0; day {
	case 1:
		fmt.Println("today is monday")

	case 2:
		fmt.Println("today is tuesday")

	default:
		fmt.Println("today is sunday")
	}

}

func example2() {
	num := 1 //if-elseif-elseif-elseif
	switch {
	case num > 0:
		fmt.Println("greater than zero")
	case num < 0:
		fmt.Println("less than zero")
	case num == 0:
		fmt.Println("equal to zero")
	}
}
