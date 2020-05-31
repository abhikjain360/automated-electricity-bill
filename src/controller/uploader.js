exports.uploader = (req, res) => {
	res.render('uploader', { title: 'uploader' })
};

// for POST connection
const mongoose = require("mongoose");
const uploadModel = require("../dbfiles/uploader.model")
let uploadSchema = mongoose.model('upload')

exports.post = (req, res) => {
	let upload = new uploadSchema();

	upload.id = req.body.id;
	upload.filepath = req.file.filename;

	upload.save((err, doc)=> {
		if (err) {
			res.redirect('upload/failed');
		}
		else {
			res.redirect('upload/success');
		}
	});
};

exports.failed = (req, res) => {
	res.render('uploadfailed');
};

exports.success = (req, res) => {
	res.render('uploadsuccess');
};
