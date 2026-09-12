package main

import (
	"fmt"
	"time"
)

func main() {
	// fmt.Println("hello raza")
	go example1("hello")

	example1("raza")
}

func example1(str string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(str)
	}

}
