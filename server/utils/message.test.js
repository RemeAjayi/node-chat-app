var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
it('should generate correct message object', ()=>{

var from = 'Jen';
var text = 'Hey u';
var message =  generateMessage(from, text);

expect(typeof message.createdAt).toBe('number');
expect(message).toMatchObject({from, text});

});
});
describe('generateMessage', ()=>{
    it('should generate correct location url', ()=>{
    
    var from = 'Jen';
    var longitude = 1;
    var latitude = 1;
    var message =  generateLocationMessage(from, longitude, latitude);
    
    expect(typeof message.createdAt).toBe('number');
    expect(message.url).toEqual('https://www.google.com/maps?'+longitude+','+latitude);
    
    });
    });