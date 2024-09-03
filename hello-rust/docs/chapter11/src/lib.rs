#[derive(Debug, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn can_hold(&self, rect: &Rectangle) -> bool {
        self.width > rect.width && self.height > rect.height
    }
}

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn exploration() {
        assert_eq!(2, 2);
    }

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 3,
            height: 5,
        };
        let smaller = Rectangle {
            width: 2,
            height: 3,
        };
        
        assert!(larger.can_hold(&smaller));
    }
        
    #[test]
    fn differ_rectangle() {
        let larger = Rectangle {
            width: 3,
            height: 5,
        };
        let smaller = Rectangle {
            width: 2,
            height: 3,
        };
        assert_ne!(larger, smaller);
    }

    #[test]
    fn experiment() {
        let res = false;
        assert!(res, "result: {}. This test is missed", res.to_string());
    }
}
