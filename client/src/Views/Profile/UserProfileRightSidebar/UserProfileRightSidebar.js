import React from 'react';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../Styles/colors';
import StyledOutlineButton from '../../../Components/Buttons/StyledOutlineButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100%',
		backgroundColor: `${colors.white}`,
		alignContent: 'center',
	},
	textField: {
		width: '60%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 0,
		marginTop: 50,
		fontWeight: 500,
	},
	logoutButton: {
		marginTop: theme.spacing(8),
		backgroundColor: `${colors.white}`,
		width: '100%',
	},
	searchIcon: {
		color: `${colors.lightBlue}`,
	},
}));

const UserProfileRightSidebar = (props) => {
	const classes = useStyles();

	const { logout } = props;

	return (
		<Grid className={classes.root} container direction="column">
			<Grid item>
				<StyledOutlineButton className={classes.logoutButton} onClick={logout}>
					Logout
				</StyledOutlineButton>
			</Grid>
			<TextField
				className={classes.textField}
				value={props.value}
				id="outlined-basic"
				label="Search"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon className={classes.searchIcon} />
						</InputAdornment>
					),
				}}
			/>
		</Grid>
	);
};

export default UserProfileRightSidebar;
