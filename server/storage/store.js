const util = require('util');
const gc = require('../config/index');
const bucket = gc.bucket('not-twitter-acs.appspot.com');
var fs = require('fs');
const utf8 = require('utf8');

const uploadImage = async (file) =>
	new Promise((resolve, reject) => {
		var localReadStream = fs.createReadStream(file.path);
		var remoteWriteStream = bucket
			.file('uploads/' + file.filename)
			.createWriteStream();
		localReadStream
			.pipe(remoteWriteStream)
			.on('error', function (err) {
				reject(`Unable to upload image, something went wrong`);
			})
			.on('finish', function () {
				const fileName = encodeURIComponent(file.filename);
				console.log(fileName);
				const publicUrl = util.format(
					`https://storage.cloud.google.com/${bucket.name}/uploads/${fileName}`
				);
				console.log('here');
				resolve(publicUrl);
			});
	});

https: module.exports = uploadImage;
