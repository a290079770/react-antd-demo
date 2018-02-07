var mongoose = require('mongoose');

//登录
module.exports.login = function(data,callback) {
	var usersModel = mongoose.model('users');
    usersModel.find(data,(err,data)=>{
    	if(err) {
           console.log(err);
    	}else {
    	   callback(data);
    	}
    })

}


//注册
module.exports.reg = function(data,callback) {
	var usersModel = mongoose.model('users');
    //验证该用户是否已经存在
    usersModel.find({username:data.username},(err,findData)=>{
    	if(err) {
    		console.log(err);
    	}else {
    		if(findData.length > 0) {
    			callback({
    				success:false,
    				msg:'该用户已注册'
    			})
    		}else {
    			//获取数据库中已经有多少条用户，计数递增
				usersModel.count((err,countdata)=>{
					//注册操作
					usersModel.create(Object.assign({
			            nickname:'新用户'+(countdata + 1),
			            age:0,
					},data),(regErr,regdata)=>{
				    	if(regErr) {
				            console.log(regErr);
				    	}else {
				    	    callback({
				    	    	success:true,
				    	    	data:regdata,
				    	    });
				    	}
				    })
				})
    		}
    	}
    })
}
