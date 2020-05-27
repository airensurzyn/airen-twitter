import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import colors from '../../Styles/colors';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Reply from '@material-ui/icons/ChatBubbleOutline';
import Retweet from '@material-ui/icons/Replay';
import LikeOutline from '@material-ui/icons/FavoriteBorder';
import LikeFull from '@material-ui/icons/Favorite';
import AuthNUserContext from '../Session/AuthNUserContext';
import { postTweetLike } from '../../Utils/api';

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
	date: { color: `${colors.midGray}`, justifyContent: 'right' },
	likedButtonEmpty: {
		color: `${colors.midGray}`,
	},
	likedButtonFull: {
		color: `${colors.likeRed}`,
	},
}));

const Tweet = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);

	const [likeCount, setLikeCount] = useState(props.tweet.likedBy.length);
	const [likeActive, setLikeActive] = useState(
		props.tweet.likedBy.indexOf(userContext.user.data._id.toString()) !== -1
	);

	const { tweet, profilePicture, profileOwner } = props;

	const formatDate = (dateString) => {
		let date = new Date(dateString);
		date = date.toDateString().split(' ');
		const month = date[1];
		const day = Number.parseInt(date[2]);
		return `${month} ${day}`;
	};

	const toggleTweetLike = async () => {
		try {
			console.log(tweet.likedBy);
			await postTweetLike(tweet._id);
			let likes = likeCount;
			let index = tweet.likedBy.indexOf(userContext.user.data.id.toString());
			console.log(userContext.user.data.id.toString());
			if (index !== -1) {
				setLikeCount(likes - 1);
				tweet.likedBy.splice(index, 1);
			} else {
				tweet.likedBy = [...tweet.likedBy, userContext.user.data.id];
				setLikeCount(likes + 1);
			}
			setLikeActive(!likeActive);
			console.log(tweet.likedBy);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ListItem button disableRipple alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt="Profile Picture" src={profilePicture} />
			</ListItemAvatar>
			<Grid container direction="column">
				<Grid container direction="row">
					<Grid item>
						<Typography className={classes.username}>{profileOwner}</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.date}>
							{formatDate(tweet.created)}
						</Typography>
					</Grid>
				</Grid>
				<ListItemText>{tweet.content}</ListItemText>
				<Grid container direction="row" className={classes.tweetInteractionRow}>
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
							onClick={toggleTweetLike}
						>
							{likeActive ? (
								<LikeFull className={classes.likedButtonFull} />
							) : (
								<LikeOutline className={classes.likedButtonEmpty} />
							)}

							<Typography className={classes.tweetInteractionNumber}>
								{likeCount}
							</Typography>
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

export default Tweet;
