import React from 'react';
import { Grid, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import colors from '../../Styles/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		background: `${colors.white}`,
		height: '100vh',
		borderRight: '1px solid #dddddd',
	},
	messagesHeader: {
		paddingLeft: theme.spacing(3),
		borderBottom: '1px solid #dddddd',
	},
	messagesSearchSection: {
		paddingTop: theme.spacing(3),
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	searchIcon: {
		color: `${colors.lightBlue}`,
	},
}));

const MessageConversationList = () => {
	const classes = useStyles();

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid container direction="row" className={classes.messagesHeader}>
				<Grid item alignItems="left">
					<h3>Messages</h3>
				</Grid>
			</Grid>
			<Grid item className={classes.messagesSearchSection}>
				<TextField
					className={classes.messagesSearchBar}
					id="outlined-basic"
					label="Search"
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon className={classes.searchIcon} />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default MessageConversationList;
