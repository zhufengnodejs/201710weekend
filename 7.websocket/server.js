let Server = require('ws').Server;
//创建一个服务器的实例
let server = new Server({port: 8080});
//监听客户端的连接，当收到客户端的连接时，会执行对应的回调函数
//socket是一个对象，是为每一个客户端单独创建的对象，服务器就通过此对象跟每个客户端建立连接
server.on('connection', function (socket) {
  //监听客户端发过来的消息
  socket.on('message', function (message) {
    console.log(message);
    //向客户端发消息
    socket.send('服务器回复:'+message);
  });
});