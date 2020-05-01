import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	DialogTitle,
	Typography,
	TextField,
	Dialog,
	makeStyles,
} from '@material-ui/core';
import StyledFillButton from '../../Components/Buttons/StyledFillButton';
import colors from '../../Styles/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	dialog: {
		marginTop: '2rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	registerTitle: {
		fontSize: '2rem',
	},
	form: {
		width: '100%',
	},
	inputContainer: {
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '2rem',
		width: '100%',
	},
	registerInputFieldRow: { marginBottom: theme.spacing(1) },
	statusLabel: {
		//color: `${colors.darkGray}`,
	},
	registerSubmitButton: {
		margin: theme.spacing(1),
		width: '200px',
		color: `${colors.white}`,
		border: 'none',
		fontSize: '.8rem',
		textTransform: 'none',
	},
}));

const Register = (props) => {
	const classes = useStyles();
	const history = useHistory();

	const {
		firstName,
		lastName,
		email,
		username,
		password,
		confirmPassword,
		handleRegisterModalClose,
		registerUser,
		setRegisterFirstName,
		setRegisterLastName,
		setRegisterEmail,
		setRegisterPassword,
		setRegisterConfirmPassword,
		setRegisterUsername,
		registerErrors,
	} = props;

	const handleClose = () => {
		handleRegisterModalClose();
		history.push('/');
	};

	const handleSubmit = () => {
		registerUser();
	};

	return (
		<Dialog
			aria-labelledby="simple-dialog-title"
			open={true}
			onClose={handleClose}
			fullWidth={true}
			maxWidth={'sm'}
		>
			<div className={classes.dialog}>
				<DialogTitle id="simple-dialog-title">
					<Typography className={classes.registerTitle}>
						Create Your Account
					</Typography>
				</DialogTitle>
			</div>
			<form method="POST" onSubmit={handleSubmit} className={classes.form}>
				<Grid
					container
					direction="column"
					alignItems="center"
					spacing={2}
					className={classes.inputContainer}
				>
					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						spacing={2}
						className={classes.registerInputFieldRow}
					>
						<Grid item sm={4}>
							<TextField
								label="First name"
								name="registerFormFirstName"
								variant="outlined"
								fullWidth
								onChange={(e) => setRegisterFirstName(e.target.value)}
								value={firstName}
								error={'firstName' in registerErrors}
								helperText={registerErrors.firstName}
							/>
						</Grid>
						<Grid item sm={4}>
							<TextField
								label="Last name"
								name="registerFormLastName"
								variant="outlined"
								fullWidth
								onChange={(e) => setRegisterLastName(e.target.value)}
								value={lastName}
								error={'lastName' in registerErrors}
								helperText={registerErrors.lastName}
							/>
						</Grid>
					</Grid>

					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						spacing={2}
						className={classes.registerInputFieldRow}
					>
						<Grid item sm={8}>
							<TextField
								label="Email"
								name="registerFormEmail"
								variant="outlined"
								fullWidth
								onChange={(e) => setRegisterEmail(e.target.value)}
								value={email}
								error={'email' in registerErrors}
								helperText={registerErrors.email}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						spacing={2}
						className={classes.registerInputFieldRow}
					>
						<Grid item sm={8}>
							<TextField
								label="Username"
								name="registerFormUsername"
								variant="outlined"
								fullWidth
								onChange={(e) => setRegisterUsername(e.target.value)}
								value={username}
								error={'username' in registerErrors}
								helperText={registerErrors.username}
							/>
						</Grid>
					</Grid>

					<Grid
						container
						alignItems="center"
						direction="row"
						justify="center"
						className={classes.registerInputFieldRow}
						spacing={1}
					>
						<Grid item sm={4}>
							<TextField
								label="Password"
								name="registerFormPassword"
								variant="outlined"
								type="password"
								fullWidth
								onChange={(e) => setRegisterPassword(e.target.value)}
								value={password}
								error={'password' in registerErrors}
								helperText={registerErrors.password}
							/>
						</Grid>
						<Grid item sm={4}>
							<TextField
								label="Confirm Password"
								name="registerFormConfirmPassword"
								variant="outlined"
								type="password"
								fullWidth
								onChange={(e) => setRegisterConfirmPassword(e.target.value)}
								value={confirmPassword}
								error={'confirmPassword' in registerErrors}
								helperText={registerErrors.confirmPassword}
							/>
						</Grid>
					</Grid>

					<Grid item sm={8}>
						<StyledFillButton
							className={classes.registerSubmitButton}
							onClick={handleSubmit}
						>
							Submit
						</StyledFillButton>
					</Grid>
				</Grid>
			</form>
		</Dialog>
	);
};

export default Register;
