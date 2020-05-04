import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import profilePicture from '../../Assets/profilePicture.jpg';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Reply from '@material-ui/icons/ChatBubbleOutline';
import Retweet from '@material-ui/icons/Replay';
import Like from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
	root: { flexGrow: 1 },
	profilePicture: {},
	username: {
		fontWeight: 'bold',
		marginRight: theme.spacing(2),
	},
	tweetInteractionButton: {
		'&:hover': { backgroundColor: 'transparent' },
		marginLeft: theme.spacing(-1.5),
	},
	tweetInteractionRow: {},
	tweetInteractionNumber: {
		marginRight: theme.spacing(10),
		marginLeft: theme.spacing(1),
	},
	date: { color: '#636363', justifyContent: 'right' },
}));

const Tweet = (props) => {
	const classes = useStyles();

	return (
		<ListItem button disableRipple alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt="Profile Picture" src={profilePicture} />
			</ListItemAvatar>
			<Grid container direction="column">
				<Grid container direction="row">
					<Grid item>
						<Typography className={classes.username}>!TheoWalcott14</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.date}>May 1, 2020</Typography>
					</Grid>
				</Grid>
				<ListItemText>
					This is the content of the first Tweet on Not(!) Twitter. All other
					tweets after this will be considered secondary.
				</ListItemText>
				<Grid
					container
					direction="row"
					justify="left"
					className={classes.tweetInteractionRow}
				>
					<Grid item>
						<IconButton
							disableRipple
							className={classes.tweetInteractionButton}
						>
							<Reply />
							<Typography className={classes.tweetInteractionNumber}>
								0
							</Typography>
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							disableRipple
							className={classes.tweetInteractionButton}
						>
							<Retweet />
							<Typography className={classes.tweetInteractionNumber}>
								0
							</Typography>
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							disableRipple
							className={classes.tweetInteractionButton}
						>
							<Like />
							<Typography className={classes.tweetInteractionNumber}>
								0
							</Typography>
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default Tweet;
