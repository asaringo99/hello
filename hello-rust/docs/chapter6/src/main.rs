use core::num;

#[derive(Debug)]
enum Message {
    Quit(u32),
    Move,
    Write,
}

impl Message {
    fn call(&self) -> u32 {
        println!("{}", "hello");
        32
    }
    fn new_quit(init_value: u32) -> Message {
        Message::Quit(init_value)
    }
}

#[derive(Debug)]
enum  UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u32 {
    let ret = match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("{:?}", state);
            25
        },
    };
    ret
}

fn main() {
    println!("{:?}",Message::Move.call());
    let message: Message = Message::new_quit(100);
    println!("{:?}",message);

    let none: Option<u8> = None;
    let none = none.is_none();
    assert_eq!(none, true);

    let coin: Coin = Coin::Quarter(UsState::Alabama);
    println!("{}", value_in_cents(coin))
}
