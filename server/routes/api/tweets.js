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

router.post(
	'/:id/like',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		let tweetId = req.params.id;
		let userId = req.user.id;
		if (mongoose.Types.ObjectId.isValid(tweetId)) {
			tweetId = mongoose.Types.ObjectId(tweetId);
		} else {
			res.status(404).send({ id: `Tweet with id ${tweetId} not found.` });
			return;
		}
		try {
			const tweet = await Tweet.findOne({ _id: tweetId });
			let { likedBy } = tweet;
			const index = likedBy.indexOf(userId);

			if (index !== -1) {
				console.log('unlike');
				console.log(index);
				likedBy.splice(index, 1);
				console.log(likedBy);
				await Tweet.updateOne(
					{ _id: tweetId },
					{
						likedBy: likedBy,
					}
				);
			} else {
				console.log('like');
				likedBy = [...tweet.likedBy, userId];
				await Tweet.updateOne(
					{ _id: tweetId },
					{
						likedBy: likedBy,
					}
				);
			}
			res.status(200).send();
		} catch (error) {
			console.log(error);
		}
	}
);

module.exports = router;
