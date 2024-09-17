use std::env::{self};
use std::error::Error;
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

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let mut f = File::open(&config.filename).expect(&format!("file not found {}", &config.filename).to_string());
    
    let mut contents = String::new();
    f.read_to_string(&mut contents)?;
    
    println!("With  text:\n{}", contents);

    Ok(())
}

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    if let Err(e) = run(config) {
        println!("Application error: {}", e);

        process::exit(1);
    }
}
