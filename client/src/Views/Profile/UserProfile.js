import React, { useContext, useState, useEffect } from 'react';
import requireAuth from '../../Components/Session/requireAuth';
import { Grid, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import colors from '../../Styles/colors';
import UserProfileSidebar from './UserProfileSidebar/UserProfileSidebar';
import UserProfileMain from './UserProfileMain/UserProfileMain';
import AuthNUserContext from '../../Components/Session/AuthNUserContext';
import UserProfileRightSidebar from './UserProfileRightSidebar/UserProfileRightSidebar';
import TweetEditor from '../../Components/Tweets/TweetEditor';
import {
	createTweet,
	getUserByUsername,
	getTweetsByUserId,
	uploadUserImage,
} from '../../Utils/api';

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
	const socket = userContext.socket;

	const [composeTweetModalOpen, setComposeTweetModalOpen] = useState(false);
	const [tweetList, setTweetList] = useState([]);
	const [recentlyFetched, setRecentlyFetched] = useState(false);
	const [newTweet, setNewTweet] = useState('');
	const [tweetError, setTweetError] = useState({});
	const [profileOwner, setProfileOwner] = useState('');
	const [currentProfile, setCurrentProfile] = useState({});
	const [profilePicture, setProfilePicture] = useState('');
	const [backgroundImage, setBackgroundImage] = useState('');
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const username = props.match.params.username.toString();
		setProfileOwner(username);

		const getProfileData = async () => {
			try {
				const userProfile = await getUserByUsername(username);
				//this is bad, need to avoid making two calls here
				const tweetList = await getTweetsByUserId(userProfile.data._id);
				setCurrentProfile(userProfile);
				setTweetList(tweetList.data);
				if (userProfile.data.profilePicture) {
					setProfilePicture(
						'http://localhost:3001/' + userProfile.data.profilePicture
					);
				} else {
					setProfilePicture(null);
				}
				if (userProfile.data.profileBackground) {
					setBackgroundImage(
						'http://localhost:3001/' + userProfile.data.profileBackground
					);
				} else {
					setBackgroundImage(null);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (socket) {
			socket.on('tweet liked', (data) => {
				let notificationList = [...notifications, data];
				setNotifications(notificationList);
			});
		}

		if (!recentlyFetched) {
			getProfileData();
			setRecentlyFetched(true);
		}
	}, [recentlyFetched]);

	const postTweet = async () => {
		if (newTweet) {
			try {
				const data = {
					content: newTweet,
				};
				await createTweet(data);
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

	const handleNotificationsClick = () => {
		console.log('clear');
		setNotifications([]);
	};

	const profileImageUpload = async (file) => {
		const data = new FormData();
		data.append('file', file[0]);
		await uploadUserImage(data, userContext.user.data.id, 'profile');
		setRecentlyFetched(false);
	};

	const backgroundImageFileUpload = async (file) => {
		const data = new FormData();
		data.append('file', file[0]);
		await uploadUserImage(data, userContext.user.data.id, 'background');
		setRecentlyFetched(false);
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
					<UserProfileSidebar
						notifications={notifications}
						handleModalOpen={handleModalOpen}
						handleNotificationsClick={handleNotificationsClick}
					/>
				</Grid>
				<Grid item xs={6}>
					<UserProfileMain
						userContext={userContext}
						tweetNavbarTabs={tweetNavbarTabs}
						tweetList={tweetList}
						profileOwner={profileOwner}
						backgroundImageFileUpload={backgroundImageFileUpload}
						backgroundImage={backgroundImage}
						profilePicture={profilePicture}
						profileImageUpload={profileImageUpload}
					/>
				</Grid>
				<Grid item xs={3}>
					<UserProfileRightSidebar logout={logout} />
				</Grid>
			</Grid>
			<TweetEditor
				className={classes.composeTweetModal}
				modalOpen={composeTweetModalOpen}
				userContext={userContext}
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
