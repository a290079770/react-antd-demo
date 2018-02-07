var express = require('express');
var router = express.Router();
var teacherService = require('../service/teacher-service.js');

/* GET users listing. */
router.get('/list', function(req, res, next) {
	//获取get请求参数
	console.log(req.query);
  // res.send('from teachers');
});


router.post('/list', function(req, res, next) {
	//获取post请求参数
	console.log(req.body);

	teacherService.list(req.body,res=>{
		console.log(res);
	})
  // res.send('from teachers');
});

module.exports = router;


