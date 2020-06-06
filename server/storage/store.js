const util = require('util');
const gc = require('../config/index');
const bucket = gc.bucket('not-twitter-acs.appspot.com');
var fs = require('fs');

const uploadImage = (file) => {
	console.log(file.path);
	console.log(file);
	console.log(file.filename);
	var localReadStream = fs.createReadStream(file.path);
	var remoteWriteStream = bucket.file(file.filename).createWriteStream();
	localReadStream
		.pipe(remoteWriteStream)
		.on('error', function (err) {})
		.on('finish', function () {
			// The file upload is complete.
		});
};

/*const uploadImage = (file) =>
	new Promise((resolve, reject) => {
		const { originalname, buffer } = file;

		const blob = bucket.file(originalname.replace(/ /g, '_'));
		const blobStream = blob.createWriteStream({
			resumable: false,
		});
		blobStream
			.on('finish', () => {
				const publicUrl = util.format(
					`https://storage.googleapis.com/${bucket.name}/uploads/${blob.name}`
				);
				resolve(publicUrl);
			})
			.on('error', () => {
				reject(`Unable to upload image, something went wrong`);
			})
			.end(buffer);
	});*/

module.exports = uploadImage;
