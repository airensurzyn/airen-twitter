import React from 'react';
import requireAuth from '../../Components/Session/requireAuth';

const UserProfile = (props) => {
	return (
		<div>
			<h1>Profile Page</h1>
		</div>
	);
};

export default requireAuth(UserProfile);
