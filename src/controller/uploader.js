exports.uploader = (req, res) => {
	res.render('uploader', { title: 'uploader' })
};

// for POST method image uploading
exports.post = (req, res) => {
	console.log(req.body);
	console.log(req.file);
}

exports.failed = (req, res) => {
	res.render('uploadfailed');
}

exports.success = (req, res) => {
	res.render('uploadsuccess');
}
