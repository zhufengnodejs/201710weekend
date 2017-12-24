let express = require('express');
let request = require('request');
let path = require('path');
let app = express();
app.use(express.static(path.resolve('public')));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
let appInfo = {
  clientId:'zfpx',
  secret:'123456'
}
let url = `http://localhost:8000/oauth?clientId=${appInfo.clientId}&redirect_uri=http://localhost:3000/callback`;
app.get('/login',function(req,res){
  res.render('login',{url});
});
app.get('/callback',async function(req,res){
  let {code} = req.query;
  let result = await fetch(`http://localhost:8000/token?clientId=${appInfo.clientId}&client_secret=${appInfo.secret}&code=${code}`);
 let {access_token} = result;
  let userInfo = await fetch(`http://localhost:8000/user?clientId=${appInfo.clientId}&access_token=${access_token}`);
  res.json(userInfo);
});
app.listen(3000);

async function fetch(url){
  return new Promise(function(resolve,reject){
    request(url,function(err,response,body){
      body = JSON.parse(body);
      resolve(body);
    })
  });
}