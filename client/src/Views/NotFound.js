import React from 'react';
import requireAuth from '../Components/Session/requireAuth';

const NotFound = () => {
	return <div>not found</div>;
};

export default requireAuth(NotFound);
