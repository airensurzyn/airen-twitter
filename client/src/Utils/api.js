import axios from 'axios';

const registerUser = (data) => {
	return axios.post('/api/users/register', data);
};

const loginUser = (data) => {
	return axios.post('/api/users/login', data);
};

const getAuthenticatedUser = () => {
	return axios.get('api/users');
};

export { registerUser, loginUser, getAuthenticatedUser };
