package main

import (
	"fmt"
	"math"
	"math/rand"
)

func main() {
	fmt.Println("Random number =", rand.Intn(10))
	fmt.Println("Pi value is =", math.Pi)
	fmt.Println(add(2, 3.3))

	fmt.Println(sqr(2.0, 3.0, false))

	a, b := swap("hello", "raza")
	fmt.Println(a, b)

}

func add(a int, b float64) int {
	return a + int(math.Ceil(b))
}

func sub(a int, b int) int {
	return a - b
}

func sqr(a float64, n float64, option bool) float64 {

	if option {
		return math.Pow(a, n)
	}

	return 0
}

func swap(str1 string, str2 string) (string, string) {
	return str2, str1
}
