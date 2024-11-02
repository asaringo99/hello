struct Counter {
    count: u32
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;
        if self.count < 10 {
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let counter = Counter::new();
    let base = 10;
    let v: Vec<_> = counter.map(|x| x * base).collect();
    println!("{:?}", v);
}
