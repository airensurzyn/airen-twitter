import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MessagesIcon from '@material-ui/icons/MailOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import colors from '../../../Styles/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AuthNUserContext from '../../../Components/Session/AuthNUserContext';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingTop: '60px',
		color: '#000000',
	},
	listText: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	listIcon: {
		color: `${colors.black}`,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		paddingRight: 0,
		contentAlign: 'center',
	},
	listLink: {
		textDecoration: 'none',
		color: `${colors.black}`,
	},
	listIconActive: {
		color: `${colors.white}`,
		backgroundColor: `${colors.lightBlue}`,
		//borderRadius: '50%',
		paddingRight: 0,
		contentAlign: 'center',
	},
}));

const SidebarList = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);
	const { notifications, handleNotificationsClick } = props;

	const submitNotificationsClick = () => {
		handleNotificationsClick();
	};

	const handleProfileClick = () => {
		console.log('clicked');
	};

	return (
		<div className={classes.root}>
			<List>
				<a
					className={classes.listLink}
					href={'/profile/' + userContext.user.data.username}
				>
					<ListItem button disableRipple>
						<ListItemIcon className={classes.listIcon}>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							disableTypography
							className={classes.listText}
							primary="Home"
						/>
					</ListItem>
				</a>
				<ListItem button disableRipple onClick={submitNotificationsClick}>
					<ListItemIcon
						className={
							notifications.length !== 0
								? classes.listIconActive
								: classes.listIcon
						}
					>
						<NotificationIcon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						className={classes.listText}
						primary="Notifications"
					/>
				</ListItem>
				<a
					className={classes.listLink}
					href={'/profile/' + userContext.user.data.username + '/messages'}
				>
					<ListItem button disableRipple>
						<ListItemIcon className={classes.listIcon}>
							<MessagesIcon />
						</ListItemIcon>
						<ListItemText
							disableTypography
							className={classes.listText}
							primary="Messages"
						/>
					</ListItem>
				</a>
				<a
					className={classes.listLink}
					href={'/profile/' + userContext.user.data.username}
				>
					<ListItem button disableRipple onClick={handleProfileClick}>
						<ListItemIcon className={classes.listIcon}>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText
							disableTypography
							className={classes.listText}
							primary="Profile"
						/>
					</ListItem>
				</a>
				<ListItem button disableRipple>
					<ListItemIcon className={classes.listIcon}>
						<MoreIcon />
					</ListItemIcon>
					<ListItemText
						disableTypography
						className={classes.listText}
						primary="More"
					/>
				</ListItem>
			</List>
		</div>
	);
};

export default SidebarList;
