import React from 'react';
import requireAuth from '../../Components/Session/requireAuth';

const MessageDashboard = (props) => {
	return <div>hello</div>;
};

export default requireAuth(MessageDashboard);
