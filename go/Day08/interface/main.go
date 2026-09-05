package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello Raza")

	// example1()
	// example2()
	// example3()
	example4()

}
func assertion(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Print("add ", v, "+ 2=", v+2)
	case string:
		fmt.Print("add hello=", "hello ", v)

	default:
		fmt.Println("new datatype sorry for asseration casting")
	}

}

func example4() {
	var a interface{} = true
	assertion(a)
}

func example3() {
	var a interface{} = "3"

	b, ok := a.(int)
	fmt.Println(b, ok)

}

type any interface{}

func example2() {
	// var a InterType{}
	var a any
	a = 3
	a = "e"
	a = 3.44
	fmt.Println(a)
}

func example1() {
	var var1 InterType = Vertex{3, 4}

	fmt.Println(var1.Sum())

}

type InterType interface {
	Sum() int
	// Sub() string
}

type Vertex struct {
	X int
	Y int
}

type MyInt int

func (a MyInt) Sum() int {
	return 3
}

func (v Vertex) Sum() int {
	return v.X + v.Y
}

func (a MyInt) Sub() string {
	return "sub"
}
