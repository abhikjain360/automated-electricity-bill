// for GET connection
exports.login = (req, res) => {
	res.render('viewbilllogin');
};

//for POST connection
const mongoose = require("mongoose");
let userSchema = mongoose.model('user');
let uploadSchema = mongoose.model('upload');

function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

exports.login_post = (req, res) => {
	userSchema.findOne({id: req.body.id}, (err, doc) => {
		if (err || doc.password != req.body.password) {
			res.redirect('viewbill/loginfailed');
		} else {
			uploadSchema.find({ id: req.body.id }, (err, doc) => {
				if (err) {
					res.redirect('viewbill/filename');
				}
				/* TODO: After uploads starts finding
					   values from images, uncomment the following */
				//billinfo.bill = doc[0].value - doc.slice(-1)[0].value;
				console.log(doc);
				let billinfo = { id: req.body.id };
				billinfo.prevdate = parseISOString(String(doc[0].filepath).slice(0, -4));
				billinfo.lastdate = parseISOString(String( doc.slice(-1)[0].filepath ).slice(0, -4));
				console.log(billinfo);
			});
		}
	});
};
