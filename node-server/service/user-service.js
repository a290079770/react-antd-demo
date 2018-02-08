var express = require('express');
var userDao = require('../dao/user-dao.js');

//登录
module.exports.login = function(data,callback) {
 userDao.login(data,res=>{
 	    if(res.success) delete res.data[0].password;
 	    //如果登录成功，需要屏蔽掉密码这个敏感信息
 	    callback(res);
   })
}


//注册
module.exports.reg = function(data,callback) {
 userDao.reg(data,res=>{
 	   if(res.success) {
 	   	 delete res.data.password;
	     callback(res);
 	   }else {
         callback(res);
 	   }
  })
}

