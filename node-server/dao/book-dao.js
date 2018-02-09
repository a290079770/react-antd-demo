var mongoose = require('mongoose');

//获取图书列表
module.exports.list = function(data,callback) {
    var book = mongoose.model('book');
    let response = {}
    book.find({
    	//标题和作者模糊查询
    	$or:[
	    	{
	    		title:{$regex:new RegExp(data.keyword,'g')}
	    	},
	    	{
	    		author:{$regex:new RegExp(data.keyword,'g')}
	    	}
    	],
     })
     .sort({
     	_id:-1
     })
     .limit(parseInt(data.ps))
     .skip((data.cp - 1) * data.ps)
     .exec((err,res)=>{
     	if(err) {
           console.log(err)
     	}else {
     	   book.count((err1,res1)=>{
              if(err1) {
		         console.log(err1)
		       }else {
                 response.totalRecord = res1;
                 response.itemList = res;

                 callback(response)
		       }
           })
     	}
     })
}

module.exports.detail = function(id,callback) {
    var book = mongoose.model('book');
    book.find({_id:id},(err,res)=>{
    	if(err) {
            console.log(11)
    	}else {
    		callback(res)
    	}
    })
}



module.exports.create = function(data,callback) {
    var book = mongoose.model('book');
    
    //先将时间处理成能读的时间
    let date = new Date(data.publishDate);
    date = date.toLocaleString().split(' ')[0];
    
    data.publishDate = date;

    book.create(data,(err,res)=>{
    	if(err) {
            console.log(err);
    	}else {
    		callback(res);
    	}
    })

}


module.exports.delete = function(id,callback) {
    var book = mongoose.model('book');
    book.remove({_id:id},(err,res)=>{
    	if(err) {
            callback(false);
    	}else {
    		callback(true);
    	}
    })
}


module.exports.update = function(data,callback) {
    var book = mongoose.model('book');
    //先将时间处理成能读的时间
    let date = data.publishDate;
    date = date.slice(0,date.lastIndexOf('-') + 3);

    data.publishDate = date;

    book.update({_id:data.id},{$set:data},(err,res)=>{
    	if(err) {
           callback({
           	 success:false,
           	 msg:err
           })             
    	}else {
    		if(res.nModified == 0) {
              callback({
               	 success:false,
               	 msg:'未修改任何数据！'
               })
    		}else {
               callback({
               	 success:true,
               })
    		} 
    	}
    })
}

