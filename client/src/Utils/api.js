import axios from 'axios';

const registerUser = (data) => {
	return axios.post('/api/users/register', data);
};

const loginUser = (data) => {
	return axios.post('/api/users/login', data);
};

export { registerUser, loginUser };
