//设置响应信息
module.exports.response = function (status,data,err,errorCode = 12) {
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
