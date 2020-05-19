import axios from 'axios';

const registerUser = (data) => {
	return axios.post('/api/users/register', data);
};

const loginUser = (data) => {
	return axios.post('/api/users/login', data);
};

const getAuthenticatedUser = () => {
	return axios.get('/api/users');
};

const getUserByUsername = (username) => {
	return axios.get('/api/users/' + username);
};

const getTweets = () => {
	return axios.get('/api/tweets');
};

const getTweetsByUserId = (id) => {
	return axios.get('/api/tweets/' + id);
};

const createTweet = (data) => {
	return axios.post('/api/tweets', data);
};

const uploadUserImage = (data, id, uploadType) => {
	return axios.post('/api/users/' + id + '/upload?type=' + uploadType, data);
};

const getProfilePicture = (name) => {
	return axios.get('/' + name);
};

const postTweetLike = (tweetId) => {
	return axios.post('/api/tweets/' + tweetId + '/like');
};

export {
	registerUser,
	loginUser,
	getAuthenticatedUser,
	getTweets,
	createTweet,
	getUserByUsername,
	getTweetsByUserId,
	uploadUserImage,
	getProfilePicture,
	postTweetLike,
};
