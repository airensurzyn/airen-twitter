const express = require('express');
const router = express.Router();
const users = require('./api/users');
const tweets = require('./api/tweets');

router.use('/api/users', users);
router.use('/api/tweets', tweets);

module.exports = router;
