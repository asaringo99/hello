fn main() {
    let s = String::from("abc");
    let len = test(&s);
    println!("{}, {}", s, len)
}

fn test(s: &String) -> i32 {
    s.len().try_into().unwrap()
}
