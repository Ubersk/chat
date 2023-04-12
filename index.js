var express = require('express');
const { connect } = require('http2');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3000);

app.get('/', function(request, respons) 
{
    respons.sendFile(__dirname + '/index.html')
}); 

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    console.log("Успешное соединение")
    connections.push(socket);
    socket.on('disconnect', function(data)
    {
        connections.splice(connections.indexOf(socket),1);
        console.log("Выход");
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {msg:data})
    })
});