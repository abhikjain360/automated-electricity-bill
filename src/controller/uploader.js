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
const exec = require('child_process').exec;
const fs = require("fs");
let uploadModel = require('../dbfiles/uploader.model');
let uploadSchema = mongoose.model('upload');
let userSchema = mongoose.model('user');

readPrediction = () => {
	fs.readFile('../prediction.txt', (err, data) => {
		if(err) {
			console.log(err)
		} else {
			exec("rm ../prediction.txt", (err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err !== null) {
					console.log('exec error: ' + err);
				}
			})
			return parseInt(data);
		}
	})
}

exports.post = (req, res) => {
	userSchema.findOne({ id : req.body.id }, (err, doc) => {
		if ( err || doc.password != req.body.password ) {
			res.redirect('uploader/failed');
		} else {
			let upload = new uploadSchema();

			// to run shell command to execute python script
			// which runs model for predictions
			// and saves them on a file
			exec("echo 'write commmand to get number output'",
			(err, stdout, stderr) => {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (err !== null) {
					console.log('exec error: ' + err);
				}
			});

			upload.id = req.body.id;
			upload.filepath = req.file.filename;
			upload.prediction = readPrediction();

			upload.save((err, doc)=> {
				if (err) {
					res.redirect('uploader/failed');
				} else {
					res.redirect('uploader/success');
				}
			});

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
