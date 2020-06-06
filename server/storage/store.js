const util = require('util');
const gc = require('./index');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const uploadImage = async (file) =>
	new Promise((resolve, reject) => {
		const fileName = new Date().toISOString() + file.originalname;
		const blob = bucket.file('uploads/' + fileName);
		const blobStream = blob.createWriteStream();

		blobStream.on('error', (err) => {
			reject(err);
		});

		blobStream.on('finish', () => {
			const encodedfileName = encodeURIComponent(fileName);
			const publicUrl = util.format(
				`https://storage.cloud.google.com/${bucket.name}/uploads/${encodedfileName}`
			);
			resolve(publicUrl);
		});

		blobStream.end(file.buffer);
	});

module.exports = uploadImage;
