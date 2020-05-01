import React, { useState } from 'react';
import requireAuth from '../../Components/Session/requireAuth';
import { Grid, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import colors from '../../Styles/colors';
import UserProfileSidebar from './UserProfileSidebar/UserProfileSidebar';
import UserProfileMain from './UserProfileMain/UserProfileMain';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.lightBlue}`,
	},
	sidebar: {
		minWidth: '200px',
	},
}));

const tweetNavbarTabs = ['Tweets', 'Likes'];

const UserProfile = (props) => {
	const classes = useStyles();

	const [selectedTweetNavbarTab, setSelectedTweetNavbarTab] = useState();

	return (
		<CssBaseline>
			<Grid className={classes.root} container direction="row">
				<Grid item xs={3} className={classes.sidebar}>
					<UserProfileSidebar />
				</Grid>
				<Grid item xs={6}>
					<UserProfileMain tweetNavbarTabs={tweetNavbarTabs} />
				</Grid>
				<Grid item xs={3}>
					<Grid className={classes.searchColumn} container direction="column">
						Search Column
					</Grid>
				</Grid>
			</Grid>
		</CssBaseline>
	);
};

export default requireAuth(UserProfile);
