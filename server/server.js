const express = require('express');
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

console.log(__dirname + '/../public' );
console.log(publicPath);

var app = express();
const server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', (socket)=>{
console.log('New user connected');

socket.emit('newMessage', generateMessage('Admin', 'Welcome to the group'));
socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user just joined'));

//must match the listener in the client javascript
socket.on('createMessage', function(message, callback){
console.log('Create Message', message);
io.emit('newMessage', generateMessage(message.from, message.text));
callback('');
});

socket.on('createLocationMessage', (coords)=>{
io.emit('newLocationMessage', generateLocationMessage('Admin', coords.longitude, coords.latitude));
});

socket.on('disconnect', ()=>{
  console.log('Client disconnected');
     });

    });
server.listen(port, ()=> {
    console.log(`Starting up on ${port}`);
  });
  