fn br() { print!("\n") }

#[derive(Debug)]
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

fn main() {
    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Float(10.12),
        SpreadsheetCell::Text(String::from("blue")),
    ];
    println!("{:?}", row);

    let s1 = String::from("hoge");
    let s2 = String::from("fuga");
    let s3 = String::from("piyo");
    let s4 = (&s1).to_string() + &s2 + &s3;
    println!("{}, {}, {}, {}", s1, s2, s3, s4);
    println!("{}", &s1[0..1]);
    println!("{}", &"hello".to_string()[0..1]);
    br();
    for c in s1.chars() {
        println!("{}", c);
    }

    use std::collections::HashMap;

    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    println!("{}", scores["Blue"]);

    let field = String::from("field");
    let value = String::from("value");
    let mut map = HashMap::new();
    map.insert((&field).to_string(), value);
    println!("{}", map[&field]);
    println!("{}", field);

    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }

    println!("{:?}", scores);

    scores.entry(String::from("Red")).or_insert(30);
    println!("{:?}", scores);
    
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", map);
    
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.chars() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", map);
}
