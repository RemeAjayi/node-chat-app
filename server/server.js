const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
console.log(__dirname + '/../public' );
console.log(publicPath);
var app = express();
app.use(express.static(publicPath));
app.listen(3000, ()=> {
    console.log(`Starting up on 3000`);
  });
  