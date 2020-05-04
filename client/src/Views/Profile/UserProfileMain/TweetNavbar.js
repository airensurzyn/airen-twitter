import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TweetNavbarTabs from './TweetNavbarTabs';
import colors from '../../../Styles/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '50px',
		width: '100%',
		borderBottom: '1px solid #dddddd',
		backgroundColor: `${colors.white}`,
	},
}));

const TweetNavbar = (props) => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="row"
			alignItems="left"
			justify="space-between"
			className={classes.root}
		>
			<Grid item className={classes.tabs}>
				<TweetNavbarTabs tweetNavbarTabs={props.tweetNavbarTabs} />
			</Grid>
		</Grid>
	);
};

export default TweetNavbar;
