var mongoose = require('mongoose');

module.exports.list = function(data,callback) {
	console.log('持久层收到消息！');
    var teacher = mongoose.model('teacher');

  //   teacher.create({
  //       username:'张三',
		// age:18,
		// job:'扫地',
		// pay:1800,
  //   },(err,data)=>{
  //   	console.log(data);
  //   })

    teacher.find({},(err,data)=>{
    	console.log(data);
    })

	// var conn = mongodb.connect('mongodb://localhost:27017/test',(err,conn)=>{
	// 	if(err) {
 //           console.log(err);
	// 	}else {
 //           console.log('连接成功');
 //           conn.find((err,data)=>{
	// 			console.log(data);
	// 	        callback('返回持久层');
	// 		})
	// 	}
	// })

}
