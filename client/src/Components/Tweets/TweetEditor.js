import React from 'react';
import { Dialog, Grid, Divider, TextField, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../Styles/colors';
import CloseIcon from '@material-ui/icons/Close';
import StyledFillButton from '../Buttons/StyledFillButton';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: `${colors.white}`,
		borderRadius: 15,
	},
	tweetTextArea: {
		width: '500px',
		backgroundColor: `${colors.white}`,
		color: `${colors.white}`,
		margin: theme.spacing(1),
	},
	closeIcon: {
		color: `${colors.lightBlue}`,
		margin: theme.spacing(1),
	},
	profileAvatar: {
		margin: theme.spacing(1),
	},
	submitTweetButton: {
		backgroundColor: `${colors.lightBlue}`,
		color: `${colors.white}`,
		border: 'none',
		width: '20%',
		margin: theme.spacing(2),
		fontSize: '.8rem',
		textTransform: 'none',
		justify: 'right',
	},
}));

const TweetEditor = (props) => {
	const classes = useStyles();
	const {
		handleModalClose,
		modalOpen,
		newTweet,
		postTweet,
		handleTweetChange,
		tweetError,
		userContext,
	} = props;

	const setModalClose = () => {
		handleModalClose();
	};

	const submitTweet = () => {
		postTweet();
		handleModalClose();
	};

	const handleTweetInputChange = (e) => {
		handleTweetChange(e);
	};

	return (
		<Dialog onClose={setModalClose} open={modalOpen}>
			<Grid className={classes.root} container direction="column">
				<CloseIcon
					button
					className={classes.closeIcon}
					onClick={setModalClose}
				/>
				<Divider />
				<Grid className={classes.root} container direction="row">
					<Avatar
						alt="Profile Picture"
						src={userContext.user.data.profileImage}
						className={classes.profileAvatar}
					/>
					<TextField
						className={classes.tweetTextArea}
						value={newTweet}
						onChange={(e) => handleTweetInputChange(e)}
						multiline
						rows={4}
						rowsMax={4}
						InputProps={{ disableUnderline: true }}
						error={'content' in tweetError}
						helperText={tweetError.content}
					/>
				</Grid>
				<StyledFillButton
					className={classes.submitTweetButton}
					onClick={submitTweet}
				>
					Tweet
				</StyledFillButton>
			</Grid>
		</Dialog>
	);
};

export default TweetEditor;
