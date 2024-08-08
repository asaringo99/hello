mod front_of_house;
mod back_of_house;

use crate::front_of_house::hosting;

pub fn main() {
    hosting::add_to_waitlist();

    let mut meal = back_of_house::cooking::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");

    println!("{}", meal.toast)
}