import React, { useState, useContext } from 'react';
import requireAuth from '../../Components/Session/requireAuth';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import colors from '../../Styles/colors';
import UserProfileSidebar from './UserProfileSidebar/UserProfileSidebar';
import UserProfileMain from './UserProfileMain/UserProfileMain';
import AuthNUserContext from '../../Components/Session/AuthNUserContext';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.white}`,
	},
	sidebar: {
		minWidth: '200px',
	},
	textField: {
		width: '60%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 0,
		marginTop: 50,
		fontWeight: 500,
	},
}));

const tweetNavbarTabs = ['Tweets', 'Likes'];

const UserProfile = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);

	return (
		<CssBaseline>
			<Grid className={classes.root} container direction="row">
				<Grid item xs={3} className={classes.sidebar}>
					<UserProfileSidebar />
				</Grid>
				<Grid item xs={6}>
					<UserProfileMain
						userContext={userContext}
						tweetNavbarTabs={tweetNavbarTabs}
					/>
				</Grid>
				<Grid item xs={3}>
					<Grid className={classes.searchColumn} container direction="column">
						<TextField
							className={classes.textField}
							//onChange={handleInputChange}
							value={props.value}
							id="outlined-basic"
							label="Search"
							variant="outlined"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon style={{ color: '#4FBE75' }} />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</CssBaseline>
	);
};

export default requireAuth(UserProfile);
