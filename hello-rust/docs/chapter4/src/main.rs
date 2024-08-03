#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn calculate_area(&self) -> u32 {
        self.height * self.width
    }
}

fn main() {
    let rect = Rectangle {width: 10, height: 20};
    println!("{:?} 's area is {}", rect, rect.calculate_area())
}
