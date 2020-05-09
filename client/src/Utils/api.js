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

const uploadProfileImage = (data, id) => {
	return axios.post('/api/users/' + id + '/upload', data);
};

export {
	registerUser,
	loginUser,
	getAuthenticatedUser,
	getTweets,
	createTweet,
	getUserByUsername,
	getTweetsByUserId,
	uploadProfileImage,
};
