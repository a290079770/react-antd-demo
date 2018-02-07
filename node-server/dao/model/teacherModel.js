var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
	username:String,
	age:Number,
	job:String,
	pay:Number,
});
mongoose.model("teacher", teacherSchema, "teacher");