var express = require('express');
var bookDao = require('../dao/book-dao.js');

module.exports.create = function(data,callback) {
	bookDao.create(data,res=>{
		callback(res);
	})
}
