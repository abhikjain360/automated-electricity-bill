const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")

// importing routes
let router = require("./router");

let app = express();

app.use(bodyparser.urlencoded({ extended: true, useNewUrlParser: true }))

app.set('views', path.join(__dirname, '/views/'));

app.engine('pug', require('pug').__express);

app.set('view engine', 'pug');

app.use('/', router);

app.listen(3000, '0.0.0.0', () => {
	console.log("Server start");
});