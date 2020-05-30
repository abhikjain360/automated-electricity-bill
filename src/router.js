const express = require('express');
const router = express.Router();

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

let index = require('./controller/index');
let adduser = require('./controller/adduser');
let uploader = require('./controller/uploader');

// index
router.get('/', index.index);

// adduser
router.get('/adduser', adduser.adduser);
router.post('/adduser', multerUpload.none(),adduser.post);
router.get('/adduser/failed', adduser.failed);
router.get('/adduser/success', adduser.success);

// uploader
router.get('/uploader', uploader.uploader);
router.post('/uploader', multerUpload.single('imgfile'), uploader.post);
router.get('uploader/success', uploader.success);
router.get('uploader/failed', uploader.failed);


module.exports = router;
