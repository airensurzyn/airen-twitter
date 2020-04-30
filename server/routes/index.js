const express = require('express');
const router = express.Router();
const users = require('./api/users');

router.use('/api/users', users);

module.exports = router;
