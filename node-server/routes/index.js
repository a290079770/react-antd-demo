var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/sayHello', function(req, res, next) {
  // res.send('hello nodeJs');
	mongoose.connect("mongodb://localhost", function(err) {
	    if(err){
	        console.log('连接失败');
	    }else{
	        console.log('连接成功');
	    }
	});
});

module.exports = router;
