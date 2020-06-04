import React, { useEffect, useState } from 'react';
import { getAuthenticatedUser } from '../../Utils/api';
import connect from '../../Utils/socket/socket';

import AuthNUserContext from './AuthNUserContext';
import axios from 'axios';

const withAuthentication = (Component) => {
	const WithAuthentication = (props) => {
		const prevToken = window.localStorage.getItem('token') || null;

		const [token, setToken] = useState(prevToken);
		const [user, setUser] = useState(null);
		const [socket, setSocket] = useState(null);

		useEffect(() => {
			const getCurrentUser = async () => {
				if (token) {
					window.localStorage.setItem('token', token);
					axios.defaults.headers.common['Authorization'] = token;
					try {
						const loggedInUser = await getAuthenticatedUser();
						console.log(loggedInUser);
						console.log(process.env.REACT_APP_SERVER_URL);
						const URL =
							process.env.REACT_APP_SERVER_URL || 'http://localhost:8080/';
						loggedInUser.data.profileImage =
							URL + loggedInUser.data.profileImage;
						setUser(loggedInUser);
						setSocket(connect(loggedInUser.data._id));
					} catch (error) {
						console.log(error);
					}
				}
			};
			getCurrentUser();
		}, [token]);

		const logout = () => {
			window.localStorage.removeItem('token');
			axios.defaults.headers.common['Authorization'] = null;
			setUser(null);
			setToken(null);
		};

		const authenticationContext = {
			token,
			setToken,
			user,
			logout,
			socket,
		};

		return (
			<AuthNUserContext.Provider value={authenticationContext}>
				<Component {...props} />
			</AuthNUserContext.Provider>
		);
	};
	return WithAuthentication;
};

export default withAuthentication;
