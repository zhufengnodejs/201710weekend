//mongoose此模块封装了对mongodb数据库的基本操作
let mongoose = require('mongoose');
//1.连接数据库 mongodb://ＩＰ或域名/数据库的名字
//在mongodb里数据库的名字是可以随便写的,返回连接对象
let conn = mongoose.createConnection('mongodb://localhost/201710node');
//2.定义数据库集合的骨架模型
let UserSchema = new mongoose.Schema({
  username:String,　　//用户名
  age:Number　　　　　　//年龄
});
//3.定义可以操作数据库的模型,通过连接对象可以定义模型
//第一个参数是模型的名称，第二个参数是模型的Schema
let UserModel = conn.model('User',UserSchema);
//增删改查
/*UserModel.create({username:'zfpx',age:9},function(err,doc){
  //err是错误对象，如果有错误的话会把错误的原因放在err里
  //doc是保存之后的文档对象，如果保存成功之后，会把保存后的数据放到doc里
  console.log(doc);
});*/
/**
 _id identify标识符　主键 一个文档中最主要的键　特点１.唯一的　２.永恒不变的，此字符是mongodb帮我们自动生成的，用来标识每个文档的
 **/
//修改 1参数是更新的范围　２参数是更新后的对象
//更新操作最多只匹配１条
//multi:true表示更新所有匹配的条数
/*UserModel.update({username:'zfpx'},{age:100},{multi:true},function(err,result){
  console.log(err);
  //更新操作是成功的，匹配到了１条，实际更新０条
  //{ ok: 1, nModified: 0, n: 1 }
  console.log(result);
});*/
//删除　１参数是删除的条件　２参数是回调函数
/*UserModel.remove({username:'zfpx'},function(err,result){
  console.log(err);
  console.log(result.result);
});*/
let users = [];
for(let i=1;i<=10;i++){
  users.push({username:`zfpx${i}`,age:i});
}
/*
UserModel.create(users,function(err,docs){
  console.log(docs);
});*/
//find查询，第一个参数是查询的条件　第二个参数是回调
//不管查询结果为１条或多条，返回的都是数组
/*
UserModel.find({age:{$gt:5}},function(err,docs){
  console.log(docs);
});*/
//分页查询　
/**
 * 每页３条
 * 查询第２页的数据
 * 按age字段倒序排列
 * 排序是用sort 传入一个对象 key就是排序的字段，值就是正序还是倒序 1升序　－１降序
 * skip跳过的记录数
 * limit 限制返回的条数
 * 当调用exec的时候查询请求才真正发出
 */
/*let pageSize = 3;
let pageNum = 2;
UserModel.find().sort({age:-1}).skip(pageSize*(pageNum-1)).limit(pageSize).exec(function(err,docs){
  console.log(docs);
});*/
