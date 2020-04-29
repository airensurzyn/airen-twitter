const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

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

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({
				email: 'Email already exists',
			});
		} else {
			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
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
	console.log(req.body.password);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	console.log(password);
	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: 'Email not found' });
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
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: 'Password incorrect' });
			}
		});
	});
});

module.exports = router;
