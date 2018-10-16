//relative time stamps e.g 3 hours ago
var moment = require('moment');
var date = moment();
console.log(date.format('Do MMM, YYYY'));
console.log(date.format('H:mm a'));

//use .fromNow() to make relative timestamps

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);