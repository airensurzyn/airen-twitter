import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import colors from '../../../Styles/colors';
import backgroundImage from '../../../Assets/bernie_arrested.png';
import profilePicture from '../../../Assets/profilePicture.jpg';

import TweetNavbar from './TweetNavbar';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		borderRight: '1px solid #dddddd',
		backgroundColor: `${colors.white}`,
	},
	mainColumn: {},
	profileTitle: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '0 30px',
	},
	profileBackgroundImage: {
		height: '25%',
		width: '100%',
		//backgroundColor: `${colors.lightBlue}`,
	},
	bgImage: {
		width: '100%',
		height: '100%',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	profileInfoSection: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '0 30px',
	},
	profileImageContainer: {
		marginTop: '-90px',
		marginBottom: theme.spacing(2),
		width: '140px',
		height: '140px',
		border: '3px solid #ffffff',
		borderRadius: '50%',
	},
	profileImage: {
		maxWidth: '100%',
		maxHeight: '100%',
		borderRadius: '50%',
	},
	profileTweetsSection: {},
}));

const UserProfileMain = (props) => {
	const classes = useStyles();
	return (
		<Grid className={classes.root} container direction="row">
			<Grid className={classes.mainColumn} container direction="column">
				<div className={classes.profileTitle}>
					<Typography>Profile Name</Typography>
				</div>
				<Divider />
				<div className={classes.profileBackgroundImage}>
					<img src={backgroundImage} className={classes.bgImage} alt="logo" />
				</div>
				<Grid
					container
					direction="column"
					className={classes.profileInfoSection}
				>
					<div className={classes.profileImageContainer}>
						<Grid item>
							<img
								src={profilePicture}
								className={classes.profileImage}
								alt="logo"
							/>
						</Grid>
					</div>
					<Grid item>
						<Typography>Profile Name</Typography>
					</Grid>
					<Grid item>
						<Typography>Joined</Typography>
					</Grid>
					<Grid item container direction="row">
						<Typography>Followers : </Typography>
						<Typography>Followed By :</Typography>
					</Grid>
				</Grid>
				<div className={classes.profileTweetsNavbar}>
					<TweetNavbar tweetNavbarTabs={props.tweetNavbarTabs} />
				</div>
				<div className={classes.profileTweetsSection}></div>
			</Grid>
		</Grid>
	);
};

export default UserProfileMain;
