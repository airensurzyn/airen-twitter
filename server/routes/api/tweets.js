const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Tweet = require('../../models/Tweet');

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { content } = req.body;
		const ownedBy = req.user.id;
		try {
			const newTweet = new Tweet({
				content: content,
				ownedBy: ownedBy,
			});
			newTweet.save();
			return res.status(200).send();
		} catch (error) {
			console.log(error);
			return res.status(500).send();
		}
	}
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const ownedBy = req.user.id;
		let results;
		try {
			results = await Tweet.find({ ownedBy: ownedBy }).sort({ created: -1 });
		} catch (error) {
			console.log(error);
			res.status(500).send();
		}
		res.status(200).send(results);
	}
);

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		let userId = req.params.id;
		if (mongoose.Types.ObjectId.isValid(userId)) {
			userId = mongoose.Types.ObjectId(userId);
		} else {
			res.status(404).send({ id: `User with id ${userId} not found.` });
			return;
		}
		try {
			const tweets = await Tweet.find({ ownedBy: userId }).sort({
				created: -1,
			});
			res.status(200).send(tweets);
		} catch (errors) {
			console.log(errors);
			res.status(500).send({ error: error });
		}
	}
);

module.exports = router;
