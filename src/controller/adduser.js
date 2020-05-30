// for GET connection
exports.adduser = (req, res, next) => {
	res.render('adduser', { title : 'adduser' });
};

// for POST connection
const mongoose = require("mongoose");
const userModel = require("../dbfiles/useradd.model")
const con = require('../dbfiles/connection')
let userSchema = mongoose.model('user');

exports.post = (req, res, next) => {
	let user = new userSchema();

	console.log(req.body)
	user.name = req.body.name;
	user.address = req.body.address;
	user.phone = req.body.phone;

	user.id = '1002';
	user.doj = new Date().toISOString();

	user.save((err, doc) => {
		if (err) {
			res.redirect('adduser/failed');
		}
		else {
			res.redirect('adduser/success');
		}
	});
}

exports.failed = (req, res) => {
	res.render('adduserfailed');
}

exports.success = (req, res) => {
	res.render('addusersuccess');
}
