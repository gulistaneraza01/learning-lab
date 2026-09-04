package main

import "fmt"

func main() {
	fmt.Println("hello raza")
	// example()

	example1()
}

func add(a *int) {
	*a = 3
}

func change(v *Vertex) {
	v.X = 10
	v.Y = 20
}

func example1() {
	// a := 4
	// add(&a)
	// fmt.Println(a)
	a := Vertex{2, 3}
	change(&a)

	fmt.Println(a)
}

type myInt int

func (a myInt) multipleBy2() int {
	return int(a) * 2
}

type Vertex struct {
	X int
	Y int
}

func (v Vertex) demoMethod() int {
	return v.X * v.Y
}

func (v *Vertex) demoMethod1() {
	v.X = 10
	v.Y = 10
}

func example() {
	var1 := myInt(3)
	fmt.Println(var1.multipleBy2())

	var2 := Vertex{2, 2}
	fmt.Println(var2.demoMethod())

	var2.demoMethod1()
	fmt.Println(var2)

}
