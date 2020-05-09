import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import backgroundImage from '../../../Assets/bernie_arrested.png';

import AuthNUserContext from '../../../Components/Session/AuthNUserContext';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '30vh',
		minHeight: '200px',
		backgroundColor: '#eeeeee',
		alignContent: 'center',
		flexGrow: 1,
	},
	uploadImageLabel: {
		paddingTop: '60%',
		align: 'center',
		flexGrow: 1,
		align: 'center',
	},
	uploadBackground: { textAlign: 'center' },
}));

const BackgroundImage = (props) => {
	const classes = useStyles();
	let profileImage, backgroundImageTester;
	const userContext = useContext(AuthNUserContext);

	const { profileOwner } = props;

	const backgroundImageElement = () => {
		if (backgroundImageTester) {
			return (
				<div className={classes.profileBackgroundImage}>
					<img src={backgroundImage} className={classes.bgImage} alt="logo" />
				</div>
			);
		} else if (
			!profileImage &&
			profileOwner === userContext.user.data.username
		) {
			return (
				<Grid item>
					<Typography className={classes.uploadImageLabel}>
						Upload an Image
					</Typography>
					<PublishIcon />
				</Grid>
			);
		} else {
			return <div className={classes.profileBackgroundNoImage}></div>;
		}
	};

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item>
				<div className={classes.uploadBackground}>
					{backgroundImageElement()}
				</div>
			</Grid>
		</Grid>
	);
};

export default BackgroundImage;
