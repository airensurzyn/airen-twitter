const express = require('express');
const router = express.Router();
const users = require('./api/users');
const tweets = require('./api/tweets');
const path = require('path');

router.use(express.static(path.join(__dirname, '../../client/build')));
router.use(express.static(path.join(__dirname, '../uploads')));
router.use('/api/users', users);
router.use('/api/tweets', tweets);

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
