import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import StyledOutlineButton from '../../Components/StyledOutlineButton';
import StyledFillButton from '../../Components/StyledFillButton';
import logo from '../../Assets/logo_lightBlue.svg';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import colors from '../../Styles/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		overflow: 'auto',
		backgroundColor: '#000000',
		display: 'flex',
	},
	leftContainer: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.lightBlue}`,
	},
	leftContainerIcon: {
		color: `${colors.white}`,
	},
	rightContainer: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.darkBlue}`,
		alignItems: 'center',
	},
	loginRow: { marginTop: theme.spacing(4), marginBottom: theme.spacing(10) },
	loginTextField: {
		margin: theme.spacing(1),
		borderRadius: 7,
		backgroundColor: `${colors.white}`,
		fontSize: '2em',
	},
	loginButton: {
		width: '90px',
		fontSize: '.75rem',
		margin: theme.spacing(1),
		marginTop: theme.spacing(2),
		verticalAlign: 'bottom',
	},
	inviteBanner: {
		fontSize: '1.75rem',
		fontWeight: 'bold',
		color: `${colors.lightBlue}`,
		marginBottom: theme.spacing(4),
		marginRight: theme.spacing(6),
	},
	logo: {
		height: '40px',
		width: '40px',
		justify: 'left',
		marginLeft: theme.spacing(6),
	},
	leftBanner: {
		color: `${colors.white}`,
		fontSize: '1.25rem',
		margin: theme.spacing(1),
	},
	joinBanner: { color: `${colors.white}`, fontSize: '1rem' },
	bottomBannerButton: {
		margin: theme.spacing(1),
		width: '350px',
	},
}));

const Login = (props) => {
	const classes = useStyles();

	const {
		registerModalOpen,
		loginEmail,
		loginPassword,
		setLoginPassword,
		setLoginEmail,
		handleRegisterModalOpen,
		handleLogIn,
	} = props;

	const handleSignUpClick = () => {
		handleRegisterModalOpen();
		console.log('test');
	};

	const handleLogInSubmit = () => {
		handleLogIn();
	};

	return (
		<CssBaseline>
			<Grid className={classes.root} container direction="row">
				<Grid item xs={6}>
					<Grid
						className={classes.leftContainer}
						alignItems="center"
						container
						direction="row"
					>
						<Grid item xs={2}></Grid>
						<Grid item xs={8}>
							<Grid alignItems="center" container direction="row">
								<SearchIcon className={classes.leftContainerIcon} />
								<Typography className={classes.leftBanner}>
									Follow Airen's Interests.
								</Typography>
							</Grid>
							<Grid alignItems="center" container direction="row">
								<PeopleOutlineIcon className={classes.leftContainerIcon} />
								<Typography className={classes.leftBanner}>
									Hear what Airen is talking about.
								</Typography>
							</Grid>
							<Grid alignItems="center" container direction="row">
								<ChatBubbleOutlineIcon className={classes.leftContainerIcon} />
								<Typography className={classes.leftBanner}>
									Join the Conversation
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={2}></Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Grid className={classes.rightContainer} container direction="column">
						<Grid
							className={classes.loginRow}
							justify="center"
							container
							direction="row"
						>
							<Grid item>
								<TextField
									className={classes.loginTextField}
									label="email"
									variant="outlined"
									onChange={(e) => setLoginEmail(e.target.value)}
								></TextField>
							</Grid>
							<Grid item>
								<TextField
									className={classes.loginTextField}
									type="password"
									label="password"
									variant="outlined"
									onChange={(e) => setLoginPassword(e.target.value)}
								></TextField>
							</Grid>
							<Grid item>
								<StyledOutlineButton
									onClick={handleLogInSubmit}
									className={classes.loginButton}
								>
									Log In
								</StyledOutlineButton>
							</Grid>
						</Grid>
						<Grid container direction="row">
							<Grid item>
								<img src={logo} className={classes.logo} alt="logo" />
							</Grid>
						</Grid>

						<Grid className={classes.inviteBanner} container direction="row">
							<Grid item>
								<Typography className={classes.inviteBanner}>
									See what's happening in Airen's world right now.
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Typography className={classes.joinBanner}>
								Join Twitter Today
							</Typography>
						</Grid>
						<Grid item>
							<StyledFillButton
								component={Link}
								to={{
									pathname: '/register',
								}}
								className={classes.bottomBannerButton}
							>
								Sign up
							</StyledFillButton>
						</Grid>
						<Grid item>
							<StyledOutlineButton className={classes.bottomBannerButton}>
								Log In
							</StyledOutlineButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</CssBaseline>
	);
};

export default Login;
