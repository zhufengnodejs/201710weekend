let express = require('express');
let request = require('request');
let bodyParser = require('body-parser');
let uuid = require('uuid');
let path = require('path');
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
//https://graph.qq.com/oauth2.0/show?
// client_id=100410602
// &redirect_uri=https%3A%2F%2Fwww.jianshu.com%2Fusers%2Fauth%2Fqq_connect%2Fcallback
app.get('/oauth',function(req,res){
  res.render('oauth');
});
app.post('/oauth',async function(req,res){
 let {client_id,redirect_uri} = req.query;
 let {username,password} = req.body;
 //拿到用户名和密码并判断登录是否成功，如果成功了表示此用户要授权给client_id

 if(username == password){
   let code = uuid.v4();
   console.log(`${redirect_uri}?code=${code}`);
   res.redirect(`${redirect_uri}?code=${code}`)
 }else{
   res.redirect('back');
 }
});
app.get('/token',function(req,res){
 let {client_id,client_secret,code} = req.query;
 let access_token = uuid.v4();
 res.json({access_token});
});
app.get('/user',function(req,res){
  res.json({username:'张三'});
});
app.listen(8000);
async function fetch(url){
  return new Promise(function(resolve,reject){
    request(url,function(err,response,body){
      body = JSON.parse(body);
      resolve(body);
    })
  });
}