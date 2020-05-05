import React, { useContext, useState, useEffect } from 'react';
import requireAuth from '../../Components/Session/requireAuth';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import colors from '../../Styles/colors';
import UserProfileSidebar from './UserProfileSidebar/UserProfileSidebar';
import UserProfileMain from './UserProfileMain/UserProfileMain';
import AuthNUserContext from '../../Components/Session/AuthNUserContext';
import UserProfileRightSidebar from './UserProfileRightSidebar/UserProfileRightSidebar';
import TweetEditor from '../../Components/Tweets/TweetEditor';
import { getTweets, createTweet } from '../../Utils/api';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.white}`,
	},
	sidebar: {
		minWidth: '200px',
	},
	composeTweetModal: {
		width: '40%',
	},
}));

const tweetNavbarTabs = ['Tweets', 'Likes'];

const UserProfile = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);

	const [composeTweetModalOpen, setComposeTweetModalOpen] = useState(false);
	const [tweetList, setTweetList] = useState([]);
	const [recentlyFetched, setRecentlyFetched] = useState(false);
	const [newTweet, setNewTweet] = useState('');
	const [tweetError, setTweetError] = useState({});

	useEffect(() => {
		const fetchTweets = async () => {
			try {
				let res = await getTweets();
				setTweetList(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		if (!recentlyFetched) {
			fetchTweets();
			setRecentlyFetched(true);
		}
	}, [recentlyFetched]);

	const postTweet = async () => {
		if (newTweet) {
			try {
				const data = {
					content: newTweet,
				};
				let res = await createTweet(data);
				setRecentlyFetched(false);
			} catch (error) {
				console.log(error);
			}
		} else {
			setTweetError({
				content: 'Tweet is empty',
			});
		}
	};

	const handleTweetChange = (e) => {
		setNewTweet(e.target.value);
		if (newTweet.length > 281) {
			setTweetError({
				content: 'Tweet exceeds 281 characters',
			});
		}
	};

	const logout = () => {
		userContext.logout();
	};

	const handleModalOpen = () => {
		setComposeTweetModalOpen(true);
	};

	const handleModalClose = () => {
		setNewTweet('');
		setComposeTweetModalOpen(false);
	};

	return (
		<CssBaseline>
			<Grid className={classes.root} container direction="row">
				<Grid item xs={3} className={classes.sidebar}>
					<UserProfileSidebar handleModalOpen={handleModalOpen} />
				</Grid>
				<Grid item xs={6}>
					<UserProfileMain
						userContext={userContext}
						tweetNavbarTabs={tweetNavbarTabs}
						tweetList={tweetList}
					/>
				</Grid>
				<Grid item xs={3}>
					<UserProfileRightSidebar logout={logout} />
				</Grid>
			</Grid>
			<TweetEditor
				className={classes.composeTweetModal}
				modalOpen={composeTweetModalOpen}
				handleModalClose={handleModalClose}
				newTweet={newTweet}
				postTweet={postTweet}
				handleTweetChange={handleTweetChange}
				tweetError={tweetError}
			/>
		</CssBaseline>
	);
};

export default requireAuth(UserProfile);
