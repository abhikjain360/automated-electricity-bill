// for GET connection
exports.login = (req, res) => {
	res.render('viewbilllogin');
};

//for POST connection
const mongoose = require("mongoose");
const chart = require('chart.js');
let userSchema = mongoose.model('user');
let uploadSchema = mongoose.model('upload');

function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function calcNsend(billinfo, doc1, doc2, res) {
	billinfo.amount = 40 + 2.4 * (billinfo.diff % 101);

	if (billinfo.diff > 100)
		billinfo.amount += 2.5 * (billinfo.diff - 100);
	if (billinfo.diff > 200)
		billinfo.amount += 3.2 * (billinfo.diff - 200);
	if (billinfo.diff > 400)
		billinfo.amount += 3.5 * (billinfo.diff - 400);
	if (billinfo.diff > 600)
		billinfo.amount += 4.85 * (billinfo.diff - 600);

	if (doc2.length == 0)
		billinfo.amount = 0;

	console.log('payed data : ' + doc2);
	console.log('total data : ' + doc1);

	res.render('loginpage', {data: JSON.stringify(doc1), unpayed_data : JSON.stringify(billinfo)});

}

exports.login_post = (req, res) => {
	userSchema.findOne({id: req.body.id}, (err, doc) => {
		if (err || doc.password != req.body.password) {
			res.redirect('loginfailed');
		} else {
			uploadSchema.find({id: req.body.id}, (err, doc1) => {
				if (err) {
					res.redirect('filename');
				}
				uploadSchema.find({id: req.body.id, payed: false}, (err, doc2) => {
					if (err) {
						res.redirect('filename');
					}
					/* TODO: After uploads starts finding
						   values from images, uncomment the following */
					//billinfo.bill = doc[0].value - doc.slice(-1)[0].value;
					console.log(doc2.length);
					let billinfo = { id: req.body.id };
					if (doc2.length == 0) {
						let point1 = doc1.slice(-1)[0];
						billinfo.prevdate = parseISOString(String(point1.filepath).slice(0, -4));
						billinfo.lastdate = billinfo.prevdate;
						billinfo.point1 = point1;
						billinfo.point2 = point1;
						billinfo.diff = 0;

						calcNsend(billinfo, doc1, doc2, res);

					} else {
						let point1 = doc2[0];
						let point2 = doc2.slice(-1)[0];
						billinfo.prevdate = parseISOString(String(point1.filepath).slice(0, -4));
						billinfo.lastdate = parseISOString(String(point2.filepath).slice(0, -4));
						billinfo.point1 = point1;
						billinfo.point2 = point2;
						billinfo.diff = point2.reading - point1.reading;

						calcNsend(billinfo, doc1, doc2, res);
					}
				});
			});
		}
	});
};

exports.login_page = (req, res) => {
	res.render('loginpage');
};

exports.pay = (req, res) => {
	uploadSchema.updateMany({ id: req.body.id }, { payed: true }, (err) => {
		if (err) {
		console.log(err);
		} else {
			res.render('payed');
		}
	})
}
