var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title:String,
	author:String,
	publisher:String,
	publishDate:String,
});
mongoose.model("book", bookSchema, "book");