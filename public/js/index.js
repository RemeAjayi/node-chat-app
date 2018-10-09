var socket = io();
socket.on('connect', function (){
console.log('Connected to Server');
});
socket.on('disconnect', function(){
console.log('Disconnected from Server');
});
socket.on('newMessage', function(message){
    console.log('You have new messages', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
     jQuery('#messages').append(li);
    });

jQuery('#message-form').on('submit', function(e){
e.preventDefault();
socket.emit('createMessage',
 {from: 'User',
  text:jQuery('[name=message]').val()
},
function () {
  
});
});

var locationButton = $('#send-location');
locationButton.on('click', function()
{
if(!navigator.geolocation)
{
    alert('Geolocation not supported');
}
navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
     longitude: position.coords.longitude,
     latitude: position.coords.latitude
    });
},
function(){
    alert('Unable to fetch position');
});
});