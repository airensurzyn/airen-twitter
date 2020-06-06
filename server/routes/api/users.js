const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const logger = require('../../config/logger');
const uploadImage = require('../../storage/store');

//var redis = require('redis');
//const REDIS_PORT = process.env.port || 6379;
//const redisClient = redis.createClient(REDIS_PORT);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	cb(null, true);
};

const upload = multer({
	storage: storage,
	limits: {
		filesize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		$or: [{ email: req.body.email }, { username: req.body.username }],
	}).then((user) => {
		if (user) {
			if (user.email === req.body.email) {
				return res.status(400).json({
					email: 'Email already exists',
				});
			} else {
				return res.status(400).json({
					username: 'Username already exists',
				});
			}
		} else {
			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				username: req.body.username.toLowerCase(),
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => logger.error(err.stack));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		logger.error({ error: errors });
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res
				.status(404)
				.json({ password: 'Email and password do not match' });
		}
		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926,
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
							username: user.username,
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ password: 'Email and password do not match' });
			}
		});
	});
});

router.get(
	'',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const userId = req.user.id;
			/*redisClient.get(userId, (err, data) => {
				if (err) {
					throw err;
				}

				if (data !== null) {
					res.send(JSON.parse(data));
				} else {
					//next();
				}
			});*/

			const user = await User.findById(userId);
			if (!user) {
				res.status(404).send({ id: `User with id ${userId} is not found` });
			} else {
				const cachedUser = JSON.stringify(user);
				//redisClient.setex(userId, 3600, cachedUser);
				res.json({
					_id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					username: user.username,
					date: user.date,
					profileImage: user.profilePicture,
					profileBackground: user.profileBackground,
				});
			}
		} catch (error) {
			logger.error({ error: error.stack });
			res.status(500).send({ error: error });
		}
	}
);

router.post(
	'/:id/upload',
	upload.single('file'),
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			console.log('Attempting image upload...');
			const imageUrl = await uploadImage(req.file);
			console.log(imageUrl);
			if (req.query['type'] === 'background') {
				await User.updateOne(
					{ _id: req.user.id },
					{
						profileBackground: req.file.path,
					}
				);
			} else {
				await User.updateOne(
					{ _id: req.user.id },
					{
						profilePicture: req.file.path,
					}
				);
			}
			res.status(200).send();
		} catch (error) {
			logger.error({ error: error.stack });
		}
	}
);

router.get(
	'/:username',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const username = req.params.username;
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				res.status(404).send({ id: `User with id ${userId} is not found` });
			} else {
				res.status(200).send(user);
			}
		} catch (errors) {
			logger.error({ error: errors.stack });
			res.status(500).send({ error: error });
		}
	}
);

module.exports = router;
