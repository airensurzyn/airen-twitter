import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import colors from '../../Styles/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		background: `${colors.white}`,
		height: '100vh',
		width: '100%',
	},
	selectConversationHeader: {
		margin: 'auto',
	},
}));

const MessageConversationView = (props) => {
	const classes = useStyles();
	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item className={classes.selectConversationHeader}>
				<h3>Select a conversation from the column to the left</h3>
			</Grid>
		</Grid>
	);
};

export default MessageConversationView;
