import React from 'react';
import {
	Grid,
	DialogTitle,
	Typography,
	TextField,
	Dialog,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	dialog: {
		margin: '1rem',
		display: 'flex',
		fontWeight: 'bold',
		flexDirection: 'column',
		alignItems: 'center',
	},
	registerTitle: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
	},
}));

const RegisterSuccessDialog = (props) => {
	const classes = useStyles();

	const {
		userRegisterSuccessModalOpen,
		toggleUserRegisterSuccessModalRegisterModal,
		userRegisterSuccess,
	} = props;

	const handleClose = () => {
		toggleUserRegisterSuccessModalRegisterModal();
	};

	return (
		<Dialog
			open={userRegisterSuccessModalOpen}
			onClose={handleClose}
			fullWidth={true}
			maxWidth={'xs'}
		>
			<div className={classes.dialog}>
				<center>
					<DialogTitle id="simple-dialog-title">
						<Typography className={classes.registerTitle}>
							{userRegisterSuccess
								? 'User Successfully Created!'
								: 'Error creating User...'}
						</Typography>
					</DialogTitle>
				</center>
			</div>
		</Dialog>
	);
};

export default RegisterSuccessDialog;
