package main

import "fmt"

func main() {
	var n, m int
	fmt.Scan(&n, &m)
	row := make([]int, n)
	for i := 0; i < n; i++ {
		row[i] = 1
	}
	for i := 0; i < m; i++ {
		B := make([]int, 2)
		fmt.Scan(&B[0], &B[1])
		B[0]--
		B[1]--
		row[B[0]] += row[B[1]]
	}
	maxval := 0
	for i := 0; i < n; i++ {
		maxval = max(maxval, row[i])
	}
	ansList := make([]int, 0)
	for i := 0; i < n; i++ {
		if row[i] == maxval {
			ansList = append(ansList, i+1)
		}
	}
	for i := 0; i < len(ansList); i++ {
		fmt.Println(ansList[i])
	}
}
