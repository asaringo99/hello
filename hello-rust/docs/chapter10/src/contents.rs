pub trait Summary {
	fn summarize(&self) -> String {
			String::from("hahahahaha")
	}
}

pub trait Dispatcher {
		fn dispatch(&self) -> String {
			"This is Dispatcher".to_string()
		}
}

pub struct NewArticle {
	pub headline: String,
	pub author: String,
	pub location: String,
	pub content: String,
}

impl Summary for NewArticle {
	fn summarize(&self) -> String {
			format!("{}, by {} ({})", self.headline, self.author, self.location)
	}
}

impl Dispatcher for NewArticle {
	fn dispatch(&self) -> String {
			"Publish Article!".to_string()
	}
}

pub struct Tweet {
	pub username: String,
	pub content: String,
	pub reply: bool,
	pub retweet: bool,
}

impl Summary for Tweet {
	fn summarize(&self) -> String {
			format!("{}: {}", self.username, self.content)
	}
}

impl Dispatcher for Tweet {
		fn dispatch(&self) -> String {
			"Publish Tweet".to_string()
		}
}

pub struct Note {}

impl Summary for Note {}

impl Dispatcher for Note {}

pub trait Topic {
    fn topic(&self) -> String;
}

impl<T: Summary> Topic for T {
	fn topic(&self) -> String {
		self.summarize()
	}
}