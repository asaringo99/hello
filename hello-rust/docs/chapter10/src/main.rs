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
    println!("{}", topic)
}
