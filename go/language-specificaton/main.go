package main

import "fmt"

/*
* this is used for multiline comment
* this is comment 1
* this is comment 2
 */

func main() { // this is main function

	fmt.Println("hello Raza")
	// example1()
	// example2()
	example4()
}

func example2() {
	var ch chan int
	var ch2 chan<- int
	var ch3 <-chan int

	ch1 := make(chan string, 100)
	ch4 := make(chan int)

	fmt.Println(ch, ch1, ch2, ch3, ch4)

}

func example1() {
	var myRune rune = 123344 //int32 = 123432
	var myRune1 rune = 'a'   //int32 = 123432
	fmt.Printf("myRune: %c (%d)  myRune: %c (%d)\n", myRune, myRune, myRune1, myRune1)

	rawString := `This is a raw string literal.
It can span multiple lines.
Special characters like \n,\t, or " are not interpreted.`
	fmt.Println("Raw string literal example:\n helllo")
	fmt.Println(rawString)
}

func init() {
	fmt.Println("First called this function")
	fmt.Println(Monday, Thrusday)

}

type Days uint8

const (
	Monday Days = iota + 1
	Tuesday
	WEdnesday
	Thrusday
)

type Gender uint8

const (
	Male Gender = iota + 1
	Female
	Other
)

func (g Gender) String() string {
	switch g {
	case Male:
		return "Male"
	case Female:
		return "Female"
	case Other:
		return "Other"
	default:
		return "Unknown"
	}
}

// Access function: returns Gender enum by name (case-insensitive), and also the enum itself
func GenderFromString(s string) (Gender, bool) {
	switch s {
	case "Male", "male":
		return Male, true
	case "Female", "female":
		return Female, true
	case "Other", "other":
		return Other, true
	default:
		return 0, false
	}
}

func example4() {
	boy := Male
	fmt.Println(Monday, boy, Female)

}
