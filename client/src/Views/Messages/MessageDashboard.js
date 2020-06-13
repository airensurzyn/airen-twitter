import React from 'react';
import { Grid } from '@material-ui/core';
import requireAuth from '../../Components/Session/requireAuth';
import MessageConversationList from './MessageConversationList';
import MessageConversationView from './MessageConversationView';

const MessageDashboard = (props) => {
	return (
		<Grid container direction="row">
			<Grid item xs={6}>
				<MessageConversationList />
			</Grid>
			<Grid item xs={6}>
				<MessageConversationView />
			</Grid>
		</Grid>
	);
};

export default requireAuth(MessageDashboard);
