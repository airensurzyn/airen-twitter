import React, { useContext, useEffect } from 'react';
import AuthNUserContext from './AuthNUserContext';

const requireAuthN = (Component) => {
	const WithAuthentication = (props) => {
		const context = useContext(AuthNUserContext);

		useEffect(() => {
			if (!context.token) props.history.push('/login');
		}, [context.token, props.history]);

		return context.user ? <Component {...props} /> : null;
	};

	return WithAuthentication;
};

export default requireAuthN;
