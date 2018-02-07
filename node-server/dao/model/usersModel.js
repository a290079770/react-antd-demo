var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	username:String,
    password:String,
    nickname:String,
    age:Number,
});
mongoose.model("users", usersSchema, "users");