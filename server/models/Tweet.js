const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		ownedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			index: true,
			required: true,
		},
		likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: { createdAt: 'created' } }
);

module.exports = Tweet = mongoose.model('tweets', TweetSchema);
