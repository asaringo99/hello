use std::env::{self};
use std::fs::File;
use std::io::prelude::*;
use std::process;

struct Config {
    query: String,
    filename: String,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return  Err("not enough arguments")
        }
        let query = args[0].clone();
        let filename = args[1].clone();
        Ok(Config { query, filename })
    }

    fn debug(&self) {
        println!("{}, {}", self.query, self.filename);
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });
    config.debug();
    let filename = &config.filename;
    let query = &config.query;
    println!("{}, {}", filename, query);

    let mut f = File::open(filename).expect(&format!("file not found {}", filename).to_string());

    let mut contents = String::new();
    f.read_to_string(&mut contents).expect("something  went wrong reading the  file");

    println!("With  text:\n{}", contents);
}
