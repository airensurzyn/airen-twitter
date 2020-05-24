const express = require('express');
const router = express.Router();
const users = require('./api/users');
const tweets = require('./api/tweets');
const status = require('./api/status');
const path = require('path');

router.use(express.static(path.join(__dirname, '../uploads')));
router.use('/api/users', users);
router.use('/api/tweets', tweets);
router.use('/api/status', status);

module.exports = router;
