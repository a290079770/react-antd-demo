var express = require('express');
var teacherDao = require('../dao/teacher-dao.js');

module.exports.list = function(data,callback) {
	teacherDao.list(data,res=>{
		console.log('收到持久层回馈的消息');
	})
	callback('服务层收到消息！');
}
