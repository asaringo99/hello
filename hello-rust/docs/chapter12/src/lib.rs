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
        let filename = args[1].clone();
        let query = args[2].clone();
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

    let res = search(&config.query, &contents);

    for line in search(&config.query, &contents) {
        println!("find : {}", line);
    }

    Ok(())
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
        ";
        assert_eq!(
            vec!["safe, fast, productive."],
            search(query, contents)
        )
    }
}