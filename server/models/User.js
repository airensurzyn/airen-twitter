const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		required: false,
	},
	following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	followedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	profileBackground: { type: String, required: false },
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('users', UserSchema);
