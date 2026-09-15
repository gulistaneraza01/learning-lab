package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	// fmt.Println("hello raza")
	// example1("hello")

	// example1("raza")
	// examples2()
	// example3()
	// example4()
	// example5()
	example6()
}

type Counter struct {
	mu sync.Mutex
	v  map[string]int
}

func (c *Counter) Inc(key string) {
	c.mu.Lock()
	c.v[key]++
	c.mu.Unlock()
}

func (c *Counter) value(key string) int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.v[key]
}

func example6() {
	c := Counter{v: make(map[string]int)}
	for i := 0; i <= 100; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.value("somekey"))
}

func example5() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)

	for {
		select {
		case <-tick:
			fmt.Println("calling setinterval")

		case <-boom:
			fmt.Println("end settimout")
			return

		default:
			fmt.Println("     .")
			time.Sleep(50 * time.Millisecond)
		}
	}

}

func example4() {
	ch := make(chan int, 10)
	go fibo(cap(ch), ch)
	for i := range ch {
		fmt.Println(i)
	}
}

func fibo(num int, ch chan int) {
	a, b := 0, 1

	for i := 0; i < num; i++ {
		ch <- a
		a, b = b, a+b
	}
	close(ch)
}

func example3() {
	ch := make(chan int, 2)
	ch <- 6
	ch <- 9
	fmt.Println(<-ch)
	fmt.Println(<-ch)
	ch <- 2
	fmt.Println(<-ch)
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
