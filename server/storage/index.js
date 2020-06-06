const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../config/gcpservice-key.json');

const { Storage } = Cloud;
const storage = new Storage({
	keyFilename: serviceKey,
	projectId: 'not-twitter-acs',
});

module.exports = storage;
