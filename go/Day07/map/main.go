package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello raza")

	// example1()
	example2()
}

func example2() {
	m := make(map[string]int)
	m["one"] = 1
	m["two"] = 2
	fmt.Println(m)

	m["two"] = 3
	fmt.Println(m)

	delete(m, "three")
	m["five"] = 0
	v, ok := m["five"]
	fmt.Println(m, v, ok)

	// fmt.Println("value-->", m["four"])

	for k, v := range m {
		fmt.Println(k, v)
	}

}

type Person struct {
	Name string
	Age  int
}

var exam2 map[string]string // it have nil value

func example1() {
	// person := map[string]Person{
	// 	"person1": Person{Name: "raza", Age: 20},
	// 	"person2": Person{Name: "raza", Age: 20},
	// }
	person := make(map[string]Person)

	exam := make(map[int]string)
	exam[1] = "raza"

	fmt.Println(person, exam)

}
