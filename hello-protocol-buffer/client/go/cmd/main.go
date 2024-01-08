//go:generate go run .
//go:generate gofmt -w ../

package main

import (
	"bytes"
	"fmt"
	"net/http"

	pb "github.com/asaringo99/hello-protocol-buffer/hello-go/cmd/pb"
	"google.golang.org/protobuf/proto"
)

func main() {
	p := pb.Person{
		Id:    1,
		Name:  "Sample",
		Email: "example@example.com",
		Phones: []*pb.Person_PhoneNumber{
			{Number: "123-4567", Type: pb.Person_HOME},
		},
	}

	serializedPerson, _ := proto.Marshal(&p)
	deserializedPerson := &pb.Person{}
	if err := proto.Unmarshal(serializedPerson, deserializedPerson); err != nil {
		panic("PANIC!")
	}
	fmt.Println(deserializedPerson)

	url := "http://localhost:8888/data"
	resp, err := http.Post(url, "application/x-protobuf", bytes.NewReader(serializedPerson))
	if err != nil {
		panic("you can't post the serializedPerson.")
	}
	defer resp.Body.Close()

	fmt.Println(resp.StatusCode)
}
