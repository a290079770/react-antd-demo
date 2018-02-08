var mongoose = require('mongoose');

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
