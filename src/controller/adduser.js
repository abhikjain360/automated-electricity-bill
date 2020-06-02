// for GET connection
exports.adduser = (req, res) => {
	res.render('adduser', { title : 'adduser' });
};

// for POST connection
const mongoose = require("mongoose");
let userModel = require('../dbfiles/useradd.model')
let userSchema = mongoose.model('user');

let userid = 1001;
userSchema.
	findOne()
	.sort({ id: -1 })
	.exec((err, doc) => {
		userid = parseInt(doc.id);
	});


exports.post = (req, res) => {
	let user = new userSchema();

	user.name = req.body.name;
	user.address = req.body.address;
	user.phone = req.body.phone;

	user.doj = new Date().toISOString();
	userid = userid + 1;
	user.id = userid;
	user.password = req.body.password;

	console.log(user);

	user.save((err, doc) => {
		if (err) {
			res.redirect('adduser/failed');
		}
		else {
			res.redirect('adduser/success');
		}
	});
};

exports.failed = (req, res) => {
	res.render('adduserfailed');
};

exports.success = (req, res) => {
	res.render('addusersuccess');
};
