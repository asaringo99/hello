use std::thread;
use std::time::Duration;
use std::sync::{mpsc, Arc, Mutex};

fn main() {
    // let (tx, rx) = mpsc::channel();
    // thread::spawn(move || {
    //     let values = vec![
    //         String::from("hi"),
    //         String::from("from"),
    //         String::from("the"),
    //         String::from("thread"),
    //     ];
    //     for value in values {
    //         tx.send(value).unwrap();
    //         thread::sleep(Duration::from_secs(1));
    //     }
    // });

    // thread::spawn(move || {
    //     for received  in rx {
    //         println!("{}", received);
    //     }
    // });
    
    // let handler = thread::spawn(|| {
    //     for i in 1..10 {
    //         println!("thread : {}", i);
    //         thread::sleep(Duration::from_secs(1));
    //     }
    // });
    // for i in 1..5 {
    //     println!("main : {}", i);
    //     thread::sleep(Duration::from_secs(1));
    // }
    
    // handler.join().expect("ddd");

    // let m = Mutex::new(5);

    // {
    //     let mut num = m.lock().unwrap();
    //     *num = 7;
    // }

    // println!("{:?}", m);

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for i in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
            println!("i: {}, tot: {}", i, *num)
        });
        handles.push(handle);
    }

    // for handle in handles {
    //     handle.join().unwrap();
    // }

    println!("Result: {}", *counter.lock().unwrap());
}
