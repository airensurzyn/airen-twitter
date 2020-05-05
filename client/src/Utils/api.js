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

const getTweets = () => {
	return axios.get('/api/tweets');
};

const createTweet = (data) => {
	return axios.post('/api/tweets', data);
};

export {
	registerUser,
	loginUser,
	getAuthenticatedUser,
	getTweets,
	createTweet,
};
