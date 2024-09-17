use std::error::Error;
use std::fs::File;
use std::io::prelude::*;

pub struct Config {
    query: String,
    filename: String,
}

impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return  Err("not enough arguments")
        }
        let query = args[0].clone();
        let filename = args[1].clone();
        Ok(Config { query, filename })
    }

    pub fn debug(&self) {
        println!("{}, {}", self.query, self.filename);
    }
}

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let mut f = File::open(&config.filename).expect(&format!("file not found {}", &config.filename).to_string());
    
    let mut contents = String::new();
    f.read_to_string(&mut contents)?;
    
    println!("With  text:\n{}", contents);

    Ok(())
}