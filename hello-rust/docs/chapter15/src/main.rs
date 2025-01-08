#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use std::ops::Deref;

use List::{Cons, Nil};

#[derive(Debug)]
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    println!("{:?}", list);

    let x = 3;
    let y = &x;
    println!("{}", y)
}
