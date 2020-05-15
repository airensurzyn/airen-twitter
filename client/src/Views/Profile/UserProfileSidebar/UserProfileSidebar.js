import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import colors from '../../../Styles/colors';
import NotLogo from '../../../Assets/NotLogo';
import SidebarList from './SidebarList';
import StyledFillButton from '../../../Components/Buttons/StyledFillButton';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		borderRight: '1px solid #dddddd',
	},
	optionsColumn: {
		backgroundColor: `${colors.white}`,
		paddingLeft: '10%',
		paddingTop: '30px',
		width: '100%',
	},
	sideBarRow: {
		width: '100%',
		backgroundColor: `${colors.lightBlue}`,
	},

	sideBarLabel: {
		fontSize: '4em',
	},
	tweetButton: {
		marginTop: theme.spacing(3),
		margin: theme.spacing(1),
		width: '70%',
		color: `${colors.white}`,
		border: 'none',
		fontSize: '.8rem',
		textTransform: 'none',
	},
}));

const UserProfileSidebar = (props) => {
	const classes = useStyles();

	const { handleModalOpen, notifications, handleNotificationsClick } = props;

	const setTweetModalOpen = () => {
		handleModalOpen();
	};

	return (
		<Grid className={classes.root} container direction="row">
			<Grid className={classes.optionsColumn} container direction="column">
				<Grid item className="classes.logoBanner">
					<NotLogo />
				</Grid>
				<SidebarList
					handleNotificationsClick={handleNotificationsClick}
					notifications={notifications}
				/>
				<StyledFillButton
					onClick={setTweetModalOpen}
					className={classes.tweetButton}
				>
					Tweet
				</StyledFillButton>
			</Grid>
		</Grid>
	);
};

export default UserProfileSidebar;
