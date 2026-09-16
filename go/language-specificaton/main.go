package main

import "fmt"

/*
* this is used for multiline comment
* this is comment 1
* this is comment 2
 */

func main() { // this is main function

	fmt.Println("hello Raza")
	example1()

}

func example1() {
	myRune := 'A'
	fmt.Printf("myRune: %c (%d)\n", myRune, myRune)

	rawString := `This is a raw string literal.
It can span multiple lines.
Special characters like \n,\t, or " are not interpreted.`
	fmt.Println("Raw string literal example:\n helllo")
	fmt.Println(rawString)
}
