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
}
