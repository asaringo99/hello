extern crate chapter12;

use std::env::{self};
use std::process;
use chapter12::Config;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    if let Err(e) = chapter12::run(config) {
        println!("Application error: {}", e);

        process::exit(1);
    }

    
}
