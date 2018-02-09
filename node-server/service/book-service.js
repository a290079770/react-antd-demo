var express = require('express');
var bookDao = require('../dao/book-dao.js');

module.exports.list = function(data,callback) {
	bookDao.list(data,res=>{
		callback(res);
	})
}

module.exports.detail = function(id,callback) {
	bookDao.detail(id,res=>{
		if(res.length == 0) {
           callback({
				success:false,
				msg:'未查到相关资源！'
			})
		}else {
           callback({
				success:true,
				data:res[0]
		   })
		}
	})
}

module.exports.create = function(data,callback) {
	bookDao.create(data,res=>{
		callback(res);
	})
}


module.exports.delete = function(id,callback) {
	bookDao.delete(id,res=>{
		if(res) {
			callback('操作成功！');
		}else {
			callback('操作失败！');
		}
	})
}

module.exports.update = function(data,callback) {
	bookDao.update(data,res=>{
		callback(res)
	})
}
