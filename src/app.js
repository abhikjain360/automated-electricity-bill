const express = require("express");
const path = require("path");
const busboy = require('express-busboy')
const fileUpload = require("express-fileupload")

// importing routes
let router = require("./router");

let app = express();

app.use(fileUpload());
busboy.extend(app);

app.set('views', path.join(__dirname, '/views/'));

app.engine('pug', require('pug').__express);

app.set('view engine', 'pug');

app.use('/', router);

app.listen(3000, '0.0.0.0', () => {
	console.log("Server start");
});
