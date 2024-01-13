use std::collections::HashMap;

fn main() {
    let mut c_map = HashMap::new();

    c_map.insert("A", 0);
    c_map.insert("B", 0);
    c_map.insert("C", 0);
    match c_map.get("D") {
        None => println!("{}", "Nothing!"),
        Some(v) => println!("{}", v),
    }
}