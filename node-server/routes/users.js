var express = require('express');
var router = express.Router();
var userService = require('../service/user-service.js');

/* GET users listing. */
//登录接口
router.post('/login', function(req, res, next) {
  let data = req.body;

  if(!validAccount(data).valid) {
  	 res.send(response(false,'',validAccount(data).msg));
  }

  //发起登录验证
  userService.login(data,resData=>{
  	 if(!resData) {
        res.send(response(false,'','该帐号还未注册！'));
  	 }else{
  	 	res.send(response(true,resData));
  	 }
  })

});


//注册接口
router.post('/reg', function(req, res, next) {
  let data = req.body;

  if(!validAccount(data).valid) {
  	 res.send(response(false,'',validAccount(data).msg));
  }

  //发起登录验证
  userService.reg(data,resData=>{
  	 if(!resData.success) {
        res.send(response(false,'',resData.msg));
  	 }else{
  	 	res.send(response(true,resData.data));
  	 }
  })

});


//验证帐号和密码
function validAccount(data) {
   //验证帐号和密码是否存在
  if(!data.username || !data.password) {
     return {
     	valid:false,
   	    msg:'帐号或密码不能为空！'
     }
  }

  //验证帐号是否是手机号或邮箱
  let phoneReg = /1{1}\w{10}/g;
  let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com|\.cn|\.com.cn)$/g
  if(!phoneReg.test(data.username) && !emailReg.test(data.username)) {
  	 return {
     	valid:false,
   	    msg:'请输入手机号或邮箱！'
     }
  }

  return {valid:true};
}



//设置响应信息
function response(status,data,err,errorCode = 12) {
	// errorCode - 根据具体业务确认
    if(status) {
    	//如果请求成功，则组织成功的数据
    	return {
    		Success:true,
    		Data:data,
    		Description:'ok',
    		Code:200
    	}
    }else {
    	return {
    		Success:false,
    		Description:err,
    		Code:errorCode,
    	}
    }
}

module.exports = router;
