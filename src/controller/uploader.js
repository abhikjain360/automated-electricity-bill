exports.uploader = (req, res) => {
	res.render('uploader', { title: 'uploader' })
};

// for POST connection
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/')
	},
	filename: (req, file, cb) => {
		filename = new Date().toISOString() + '.jpg';
		cb(null, filename);
	}
});
const multerUpload = multer({ storage: storage });

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

exports.multer = multerUpload.single('imgfile')

exports.failed = (req, res) => {
	res.render('uploadfailed');
};

exports.success = (req, res) => {
	res.render('uploadsuccess');
};
