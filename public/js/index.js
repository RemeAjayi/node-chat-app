var socket = io();
socket.on('connect', function (){
console.log('Connected to Server');
});
socket.on('disconnect', function(){
console.log('Disconnected from Server');
});
socket.on('newMessage', function(message){
     var formattedTime = moment(message.createdAt).format('h:mm a');
     var template = jQuery('#message-template').html();
     var html = Mustache.render(template, {
         text: message.text,
         from: message.from,
         createdAt: formattedTime
        });
     jQuery('#messages').append(html);
  
    // console.log('You have new messages', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //  jQuery('#messages').append(li);
    });

jQuery('#message-form').on('submit', function(e){
e.preventDefault();

var messageTextbox = jQuery('[name=message]');

socket.emit('createMessage',
 {
  from: 'User',
  text:messageTextbox.val()
},
function () {
    messageTextbox.val('');
});
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
       });
    jQuery('#messages').append(html);

});

var locationButton = $('#send-location');
locationButton.on('click', function()
{
if(!navigator.geolocation)
{
    alert('Geolocation not supported');
}
locationButton.attr('disabled', 'disabled').text('Sending Location ...');
navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
     longitude: position.coords.longitude,
     latitude: position.coords.latitude
    });
},
function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch position');
});
});