import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Dropzone from 'react-dropzone';

import AuthNUserContext from '../../../Components/Session/AuthNUserContext';

const useStyles = makeStyles((theme) => ({
	profileUsername: {
		fontWeight: 'bold',
		fontSize: '1.25rem',
	},
	profileDetail: {
		color: '#636363',
	},
	profileInfoSection: {
		marginBottom: theme.spacing(1),
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '0 30px',
	},
	profileImageContainer: {
		marginTop: '-65px',
		marginBottom: theme.spacing(2),
		marginLeft: theme.spacing(1),
		position: 'relative',
		width: '140px',
		height: '140px',
		borderRadius: '50%',
		overflow: 'hidden',
		border: '3px solid #ffffff',
	},
	profileImageContainerImg: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	profileImageContainerNoImage: {
		marginTop: '-65px',
		marginBottom: theme.spacing(2),
		marginLeft: theme.spacing(1),
		width: '140px',
		height: '140px',
		border: '3px solid #ffffff',
		borderRadius: '50%',
		backgroundColor: '#eeeeee',
		textAlign: 'center',
	},
	uploadProfileImage: {
		maxWidth: '100%',
		width: '100%',
		height: '100%',
		maxHeight: '100%',
		borderRadius: '50%',
		backgroundColor: '#000000',
	},
	notFoundMessage: {
		fontWeight: 'bold',
		fontSize: '1.25rem',
		margin: 'auto',
	},
	notFoundSubMessage: {
		margin: 'auto',
		color: '#636363',
	},
	uploadImageLabel: { paddingTop: '35%', fontSize: '1rem' },
}));

const UserProfileDashboard = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);

	const { profileOwner, profilePicture, profileImageUpload } = props;

	const handleUploadImage = (file) => {
		profileImageUpload(file);
	};

	const profileImageElement = function () {
		if (profilePicture) {
			return (
				<div className={classes.profileImageContainer}>
					<img
						src={profilePicture}
						className={classes.profileImageContainerImg}
						alt="profile"
					/>
				</div>
			);
		} else if (
			!profilePicture &&
			profileOwner.username === userContext.user.data.username &&
			profilePicture !== 'none'
		) {
			return (
				<div
					className={classes.profileImageContainerNoImage}
					//onClick={handleUploadImage}
				>
					<Dropzone onDrop={(e) => handleUploadImage(e)}>
						{({ getRootProps, getInputProps }) => (
							<section className={classes.dropzone}>
								<div {...getRootProps()}>
									<input {...getInputProps()} />

									{profilePicture ? (
										<Typography
											style={{ color: 'black' }}
											className={classes.fileMessage}
										>
											{' '}
											{this.state.fileMessage}
										</Typography>
									) : (
										<Typography className={classes.uploadImageLabel}>
											Upload an Image
											<PublishIcon />
										</Typography>
									)}
								</div>
							</section>
						)}
					</Dropzone>
				</div>
			);
		} else {
			return (
				<div
					className={classes.profileImageContainerNoImage}
					//onClick={handleUploadImage}
				></div>
			);
		}
	};

	return (
		<Grid container direction="column">
			<Grid item>{profileImageElement()}</Grid>
			<Grid container direction="column" className={classes.profileInfoSection}>
				{profileOwner ? (
					<div>
						<Grid item>
							<Typography className={classes.profileUsername}>
								!{profileOwner.username}
							</Typography>
						</Grid>
						<Grid item>
							<Typography className={classes.profileDetail}>
								Joined : {profileOwner ? profileOwner.date.slice(0, 4) : ''}
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
					</div>
				) : (
					<Grid container direction="row">
						<Grid container direction="column">
							<Grid item className={classes.notFoundMessage}>
								User Not Found
							</Grid>
							<Grid item className={classes.notFoundSubMessage}>
								Try another username
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default UserProfileDashboard;
