var express = require('express');
var router = express.Router();
var bookService = require('../service/book-service.js');
var response = require('../public/javascripts/plug.js').response; 

/* GET users listing. */
router.get('/list', function(req, res, next) {
	//获取get请求参数
	console.log(req.query);
  // res.send('from teachers');
});


router.post('/create', function(req, res, next) {
	//获取post请求参数
    if(!validBookData(req.body).valid) {
  	  return res.send(response(false,'',validAccount(data).msg));
    }

	bookService.create(req.body,resData=>{
		return res.send(response(true,resData));
	})
});




function validBookData(data) {
  //验证字段完整性
  if(!data.title) {
     return {
     	valid:false,
   	    msg:'图书名称不能为空！'
     }
  }

  if(!data.author) {
     return {
     	valid:false,
   	    msg:'图书作者不能为空！'
     }
  }

  if( !data.publisher) {
     return {
     	valid:false,
   	    msg:'出版社名称不能为空！'
     }
  }

  if(!data.publishDate) {
     return {
     	valid:false,
   	    msg:'出版时间不能为空！'
     }
  }

  if(new Date(data.publishDate).toString().indexOf('Invalid') !== -1) {
     return {
     	valid:false,
   	    msg:'出版时间格式不正确！'
     }
  }
  return {valid:true};
}
module.exports = router;


