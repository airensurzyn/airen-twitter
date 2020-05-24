const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.status(200).send({ status: 'alive' });
});

module.exports = router;
