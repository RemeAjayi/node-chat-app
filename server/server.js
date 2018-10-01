const express = require('express');
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

console.log(__dirname + '/../public' );
console.log(publicPath);

var app = express();
const server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket)=>{
console.log('New user connected');

socket.emit("newMessage", {
  from: 'mike@example.com',
  text:'hey, what\'s up',
  timestamp: 123
});
//must match the listener in the client javascript
socket.on('createMessage', function(newMessage){
console.log('Create Message', newMessage);
});

socket.on('disconnect', ()=>{
  console.log('Client disconnected');
     });

    });
server.listen(port, ()=> {
    console.log(`Starting up on ${port}`);
  });
  