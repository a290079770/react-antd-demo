var express = require('express');
var router = express.Router();
var bookService = require('../service/book-service.js');
var response = require('../public/javascripts/plug.js').response; 

/* GET users listing. */
//图书列表
router.get('/list', function(req, res, next) {
	//获取get请求参数，赋默认值
	let data = {
		ps:req.query.ps ? req.query.ps : 10,
		cp:req.query.cp ? req.query.cp : 1,
		keyword:req.query.keyword ? req.query.keyword : '',
	}
    bookService.list(data,resData=>{
		return res.send(response(true,resData));
	})
});

//图书详情
router.get('/detail', function(req, res, next) {
	//获取get请求参数，赋默认值
	if(!req.query.id) {
  	  return res.send(response(false,'','图书编号不能为空！'));
    }
    bookService.detail(req.query.id,resData=>{
    	if(resData.success) {
    		return res.send(response(true,resData.data));
    	}else {
    		return res.send(response(false,'',resData.msg));
    	}
	})
});

//新增图书
router.post('/create', function(req, res, next) {
	//获取post请求参数
    if(!validBookData(req.body).valid) {
  	  return res.send(response(false,'',validAccount(data).msg));
    }

	bookService.create(req.body,resData=>{
		return res.send(response(true,resData));
	})
});

//删除图书
router.post('/delete', function(req, res, next) {
	//获取post请求参数
    if(!req.body.id) {
  	  return res.send(response(false,'','图书编号不能为空！'));
    }

	bookService.delete(req.body.id,resData=>{
		return res.send(response(true,resData));
	})
});


//修改图书
router.post('/update', function(req, res, next) {
	//获取post请求参数
    if(!req.body.id) {
  	  return res.send(response(false,'','图书编号不能为空！'));
    }

	bookService.update(req.body,resData=>{
		if(resData.success) {
    		return res.send(response(true,'ok'));
    	}else {
    		return res.send(response(false,'',resData.msg));
    	}
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


