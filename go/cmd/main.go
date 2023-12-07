package main

import "fmt"

type handler func(v int) int

func create() handler {
	return func(v int) int {
		return v
	}
}

func (h *handler) top(a int) int {
	return a
}

func main() {
	f := create()
	fmt.Println(f.top(1))
}
