#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn calculate_area(&self) -> u32 {
        self.height * self.width
    }
    fn can_hold(&self, rect: &Rectangle) -> bool {
        self.width >= rect.width && self.height >= rect.height
    }
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle {height, width}
    }
}

fn main() {
    let rect1 = Rectangle {width: 10, height: 20};
    let rect2 = Rectangle {width: 10, height: 20};
    let rect3: Rectangle = Rectangle::new(10, 15);
    println!("{:?} 's area is {}", rect1, rect1.calculate_area());
    println!("{:?} can hold {:?}: {}", rect1, rect2, rect1.can_hold(&rect2));
}
