mod contents;

use contents::Topic;

use crate::contents::Summary;
use crate::contents::Dispatcher;
use crate::contents::Note;
use crate::contents::Tweet;

fn publish(summary: &(impl Summary + Dispatcher)) -> String {
    let dispatch_value = summary.dispatch();
    println!("{}", dispatch_value);
    summary.summarize()
}

fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}

fn f<'a>() -> &'a str {
    let s: &'static str = "Wfsd";
    s
}

fn main() {
    let tweet = Tweet{
        username: String::from("bob"),
        content: "hello world".to_string(),
        reply: false,
        retweet: false,
    };
    let summary = publish(&tweet);
    println!("{}", summary);

    let note = Note{};
    println!("{}", note.summarize());

    let topic = note.topic();
    println!("{}", topic);

    {
        let s1 = "aaa";
        let s2 = "aaaa";
        let res;
        {
            res = longer(s1, s2);
        }
        println!("{}", res);
    }

    let x = f();
    println!("{}", x)
}
