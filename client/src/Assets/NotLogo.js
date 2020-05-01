import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import colors from '../Styles/colors';
import logo from './logo_lightBlue.svg';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles((theme) => ({
	root: {},
	logo: {
		height: '30px',
		width: '30px',
		justify: 'left',
	},
	notIcon: {
		height: '30px',
		fontSize: 'large',
		color: `${colors.darkBlue}`,
	},
}));

const NotLogo = () => {
	const classes = useStyles();
	return (
		<Grid className={classes.root} container direction="row">
			<Grid item>
				<PriorityHighIcon className={classes.notIcon} />
				<img src={logo} className={classes.logo} alt="logo" />
			</Grid>
		</Grid>
	);
};

export default NotLogo;
