const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")

// importing routes
let index = require('./routes/index');
let con = require("./dbfiles/connection");

let app = express();

app.set('views', path.join(__dirname, 'views'));

app.engine('pug', require('pug').__express);

app.set('view engine', 'pug');

app.use('/', index);

app.listen(3000, '0.0.0.0', () => {
	console.log("Server start");
});
