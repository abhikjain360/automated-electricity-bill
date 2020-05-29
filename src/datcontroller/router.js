const express = require('express');
const router = express.Router();

let index = require('./controller/index');
let adduser = require('./controller/adduser')

router.get('/', index.index);
router.get('/adduser', adduser.adduser);
router.post('/adduser', adduser.post);
router.get('/adduser/failed', adduser.failed)
router.get('/adduser/success', adduser.success)


module.exports = router;
