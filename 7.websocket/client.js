let Socket = require('ws');
//创建一个客户端的实例
let socket = new Socket('ws://localhost:8080');
//监听客户端连接成功事件
socket.on('open',function(){
   console.log('连接成功');
   socket.send('服务器你好');
});
//在客户端监听服务器端发过来的消息
socket.on('message',function(message){
  console.log(message);
});