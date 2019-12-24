package main

import (
	"fmt"
	"strconv"
)

func main() {
	var age string
	var animal string
	var activity string
	var drink string

	fmt.Print("How old are you? ")
	fmt.Scanln(&age)
	a, _ := strconv.Atoi(age)
	s := strconv.Itoa((a / 2) + a/3)

	fmt.Print("What's your favorite animal? ")
	fmt.Scanln(&animal)

	fmt.Print("What's your favorite activity to do with your favorite animal? ")
	fmt.Scanln(&activity)

	fmt.Print("What's your favorite drink? ")
	fmt.Scanln(&drink)

	fmt.Println("On my way home, I look through " + age + " shops, trying to find " + drink + ". I finally found some " + drink + ", after going through " + s + " stores.")
	fmt.Println("Now I can get home and enjoy a nice glass of " + drink + ". While " + activity + " my " + animal + ".")
}
