const router = require('express').Router();

let index = require('./controller/index');
let adduser = require('./controller/adduser');
let uploader = require('./controller/uploader');
let viewbill = require('./controller/viewbill');

// index
router.get('/', index.index);

// adduser
router.get('/adduser', adduser.adduser);
router.post('/adduser', adduser.post);
router.get('/adduser/failed', adduser.failed);
router.get('/adduser/success', adduser.success);

// uploader
router.get('/uploader', uploader.uploader);
router.post('/uploader', uploader.multer, uploader.post);
router.get('/uploader/success', uploader.success);
router.get('/uploader/failed', uploader.failed);

// viewbill
router.get('/viewbill/login', viewbill.login);
router.post('/viewbill/login', viewbill.login_post);
//router.get('/viewbill/loginfailed', viewbill.failed);
//
module.exports = router;
