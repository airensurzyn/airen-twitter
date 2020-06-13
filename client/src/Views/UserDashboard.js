import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import UserProfileSidebar from './Profile/UserProfileSidebar/UserProfileSidebar';
import UserProfile from './Profile/UserProfile';
import MessageDashboard from './Messages/MessageDashboard';
import { Route, Switch } from 'react-router-dom';
import requireAuth from '../Components/Session/requireAuth';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserProfileRightSidebar from './Profile/UserProfileRightSidebar/UserProfileRightSidebar';
import AuthNUserContext from '../Components/Session/AuthNUserContext';

const UserDashboard = (props) => {
	const userContext = useContext(AuthNUserContext);
	const socket = userContext.socket;

	const [notifications, setNotifications] = useState([]);
	const [composeTweetModalOpen, setComposeTweetModalOpen] = useState(false);

	useEffect(() => {
		if (socket) {
			socket.on('tweet liked', (data) => {
				if (data.username !== userContext.user.data.username) {
					let notificationList = [...notifications, data];
					setNotifications(notificationList);
				}
			});
		}
	}, []);

	const handleNotificationsClick = () => {
		setNotifications([]);
	};

	const logout = () => {
		userContext.logout();
	};

	const handleModalOpen = () => {
		setComposeTweetModalOpen(true);
	};

	return (
		<CssBaseline>
			<Grid container direction="row">
				<Grid item xs={3}>
					<UserProfileSidebar
						handleNotificationsClick={handleNotificationsClick}
						notifications={notifications}
						handleModalOpen={handleModalOpen}
					/>
				</Grid>
				<Switch>
					<Grid item xs={6}>
						<Route
							exact
							path={'/profile/:username/messages'}
							component={MessageDashboard}
						/>
						<Route exact path={'/profile/:username'} component={UserProfile} />
					</Grid>
				</Switch>
				<Grid item xs={3}>
					<UserProfileRightSidebar logout={logout} />
				</Grid>
			</Grid>
		</CssBaseline>
	);
};

export default requireAuth(UserDashboard);
