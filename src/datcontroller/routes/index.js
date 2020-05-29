const express = require('express');
const router = express.Router();

let index = require('../controller/index');

router.get('/', index.index);

module.exports = router;
