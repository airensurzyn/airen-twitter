import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Dropzone from 'react-dropzone';

import profilePicture from '../../../Assets/profilePicture.jpg';

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
		marginBottom: theme.spacing(2),
		width: '140px',
		height: '140px',
		border: '3px solid #ffffff',
		borderRadius: '50%',
	},
	profileImageContainerNoImage: {
		marginTop: '-65px',
		marginBottom: theme.spacing(2),
		width: '140px',
		height: '140px',
		border: '3px solid #ffffff',
		borderRadius: '50%',
		backgroundColor: '#eeeeee',
		textAlign: 'center',
	},
	profileImage: {
		maxWidth: '100%',
		maxHeight: '100%',
		borderRadius: '50%',
	},
	uploadProfileImage: {
		maxWidth: '100%',
		width: '100%',
		height: '100%',
		maxHeight: '100%',
		borderRadius: '50%',
		backgroundColor: '#000000',
	},
	uploadImageLabel: { paddingTop: '35%', fontSize: '1rem' },
}));

const UserProfileDashboard = (props) => {
	const classes = useStyles();
	const userContext = useContext(AuthNUserContext);

	let profileImage;

	const { profileOwner } = props;

	const handleUploadImage = () => {
		console.log('clicked');
	};

	const profileImageElement = function () {
		if (profileImage) {
			return (
				<div className={classes.profileImageContainer}>
					<Grid item>
						<img
							src={profilePicture}
							className={classes.profileImage}
							alt="profile"
						/>
					</Grid>
				</div>
			);
		} else if (
			!profileImage &&
			profileOwner === userContext.user.data.username
		) {
			return (
				<div
					className={classes.profileImageContainerNoImage}
					onClick={handleUploadImage}
				>
					<Dropzone onDrop={(e) => this.handleFileSelect(e)}>
						{({ getRootProps, getInputProps }) => (
							<section className={classes.dropzone}>
								<div {...getRootProps()}>
									<input {...getInputProps()} />

									{profileImage ? (
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
					onClick={handleUploadImage}
				></div>
			);
		}
	};

	return (
		<Grid container direction="column">
			<Grid item>{profileImageElement()}</Grid>
			<Grid container direction="column" className={classes.profileInfoSection}>
				<Grid item>
					<Typography className={classes.profileUsername}>
						!{profileOwner}
					</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.profileDetail}>
						Joined : {userContext.user.data.created.slice(0, 4)}
					</Typography>
				</Grid>
				<Grid item container direction="row">
					<Typography className={classes.profileDetail}>Followers: </Typography>
					<Typography className={classes.profileDetail}>
						Followed By:
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserProfileDashboard;
