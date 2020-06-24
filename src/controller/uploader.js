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
		let d = new Date();
		d.setHours(d.getHours() + 5);
		d.setMinutes(d.getMinutes + 30);
		filename = d.toISOString() + '.jpg';
		cb(null, filename);
	}
});

const multerUpload = multer({ storage: storage });

const mongoose = require("mongoose");
const exec = require('child_process').exec;
const fs = require("fs");
let uploadModel = require('../dbfiles/uploader.model');
let uploadSchema = mongoose.model('upload');
let userSchema = mongoose.model('user');

function readPrediction(req, res) {
	fs.readFile('prediction.txt', (err, data) => {
		if(err) {
			console.log("open error : " + err)
		} else {
			// TODO: uncomment it when working
//			exec("rm ../prediction.txt", (err, stdout, stderr) => {
//				console.log('stdout: ' + stdout);
//				console.log('stderr: ' + stderr);
//				if (err !== null) {
//					console.log('exec error: ' + err);
//				}
//			})
			let upload = new uploadSchema();

			// to run shell command to execute python script
			// which runs model for predictions
			// and saves them on a file
			exec("echo 'write commmand to get number output'",
			(err, stdout, stderr) => {
				if (err !== null) {
					console.log('exec error: ' + err);
				}
			});

			upload.reading = parseInt(data);
			console.log("upload rading : " + upload.reading);

			upload.id = req.body.id;
			upload.filepath = req.file.filename;
			upload.payed = false;

			upload.save((err) => {
				if (err) {
					res.redirect('uploader/failed');
				} else {
					res.redirect('uploader/success');
				}
			});
		}
	})
}

exports.post = (req, res) => {
	userSchema.findOne({ id : req.body.id }, (err, doc) => {
		if ( err || doc.password != req.body.password ) {
			res.redirect('uploader/failed');
		} else {
			readPrediction(req, res);
		}
	})
};

exports.multer = multerUpload.single('imgfile')

exports.failed = (req, res) => {
	res.render('uploadfailed');
};

exports.success = (req, res) => {
	res.render('uploadsuccess');
};
