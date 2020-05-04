import React from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import colors from '../../../Styles/colors';
import backgroundImage from '../../../Assets/bernie_arrested.png';
import profilePicture from '../../../Assets/profilePicture.jpg';

import TweetNavbar from './TweetNavbar';
import TweetList from './TweetList';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		borderRight: '1px solid #dddddd',
		backgroundColor: `${colors.white}`,
		overflow: 'auto',
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
	profileUsername: {
		fontWeight: 'bold',
		fontSize: '1.25rem',
	},
	profileDetail: {
		color: '#636363',
	},
	profileBackgroundImage: {
		height: '22%',
		width: '100%',
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
	profileTweetsSection: {
		width: '100%',
	},
}));

const UserProfileMain = (props) => {
	const classes = useStyles();

	const { userContext } = props;
	console.log(userContext);

	return (
		<Grid className={classes.root} container direction="row">
			<Grid className={classes.mainColumn} container direction="column">
				<div className={classes.profileTitle}>
					<Typography>{userContext.user.data.username}</Typography>
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
								alt="profile"
							/>
						</Grid>
					</div>
					<Grid item>
						<Typography className={classes.profileUsername}>
							!{userContext.user.data.username}
						</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.profileDetail}>
							Joined : {userContext.user.data.created.slice(0, 4)}
						</Typography>
					</Grid>
					<Grid item container direction="row">
						<Typography className={classes.profileDetail}>
							Followers:{' '}
						</Typography>
						<Typography className={classes.profileDetail}>
							Followed By:
						</Typography>
					</Grid>
				</Grid>
				<div className={classes.profileTweetsNavbar}>
					<TweetNavbar tweetNavbarTabs={props.tweetNavbarTabs} />
				</div>
				<div className={classes.profileTweetsSection}>
					<TweetList />
				</div>
			</Grid>
		</Grid>
	);
};

export default UserProfileMain;
