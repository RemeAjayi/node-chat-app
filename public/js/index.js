var socket = io();
socket.on('connect', function (){
console.log('Connected to Server');

socket.emit('createMessage',  {
to:'jen@example.com',
text: 'hey, this is Reme'
});

});
socket.on('disconnect', function(){
console.log('Disconnected from Server');
});
socket.on('newMessage', function(message){
    console.log('You have new messages', message);
    });