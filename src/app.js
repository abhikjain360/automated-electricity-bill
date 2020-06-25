const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");

// required to start mongodb conenction
const con = require('./dbfiles/connection');

// importing routes
let router = require("./router");

//initializing app
let app = express();

// use bodyparser for text input
app.use(bodyparser.urlencoded({ extended: false }));

// views folder
app.set('views', path.join(__dirname, '/views/front-end-view/'));

//temp fixes
app.use(express.static('./views/front-end-view/css'));

// use pug to render
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express)

// leave the rest to router.js
app.use('/', router);

// start server
app.listen(3000, '0.0.0.0', () => {
	console.log("Server start");
});
