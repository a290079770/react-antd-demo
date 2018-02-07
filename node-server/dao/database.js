var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/test';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});