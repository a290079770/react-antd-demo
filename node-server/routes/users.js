var express = require('express');
var router = express.Router();
var userService = require('../service/user-service.js');
var response = require('../public/javascripts/plug.js').response; 

/* GET users listing. */
//登录接口
router.post('/login', function(req, res, next) {
  let data = req.body;

  if(!validAccount(data).valid) {
  	 return res.send(response(false,'',validAccount(data).msg));
  }

  //发起登录验证
  userService.login(data,resData=>{
  	 if(!resData.success) {
        return res.send(response(false,'',resData.msg));
  	 }else{
  	   	return res.send(response(true,resData.data[0]));
  	 }
  })

});


//注册接口
router.post('/reg', function(req, res, next) {
  let data = req.body;

  if(!validAccount(data).valid) {
  	 return res.send(response(false,'',validAccount(data).msg));
  }

  //发起登录验证
  userService.reg(data,resData=>{
  	 if(!resData.success) {
        return res.send(response(false,'',resData.msg));
  	 }else{
  	   	return res.send(response(true,resData.data));
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





module.exports = router;
