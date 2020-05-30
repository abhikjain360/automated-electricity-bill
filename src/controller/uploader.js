exports.uploader = (req, res, next) => {
	res.render('uploader', { title: 'uploader' })
};

// for POST method image uploading
exports.post = (req, res, next) => {
	let img = req.files.img;
	let id = req.body.id;
	let date = Date.toISOString(Date.now());
	let imgpath = '../images/' + id + date + '.jpg';
	img.mv(imgpath, (err) => {
		if (err) {
			res.redirect('uploader/failed');
		} else {
			res.redirect('/upload/success');
		}
	});
}

exports.failed = (req, res) => {
	res.render('uploadfailed');
}

exports.success = (req, res) => {
	res.render('uploadsuccess');
}
