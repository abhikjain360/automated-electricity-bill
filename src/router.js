const express = require('express');
const router = express.Router();

let index = require('./controller/index');
let adduser = require('./controller/adduser')
let uploader = require('./controller/uploader')

// index
router.get('/', index.index);

// adduser
router.get('/adduser', adduser.adduser);
router.post('/adduser', adduser.post);
router.get('/adduser/failed', adduser.failed);
router.get('/adduser/success', adduser.success);

// uploader
router.get('/uploader', uploader.uploader);
router.posr('/uploader', uploader.post);
router.get('uploader/success', uploader.success);
router.get('uploader/failed', uploader.failed);


module.exports = router;
