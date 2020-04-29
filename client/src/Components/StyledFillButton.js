import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import colors from '../Styles/colors';

const StyledFillButton = withStyles({
	root: {
		backgroundColor: `${colors.lightBlue}`,
		border: `1px solid ${colors.darkBlue}`,
		borderRadius: 20,
		color: `${colors.darkBlue}`,
		fontWeight: 'bold',
		padding: '10px',
		height: 40,
		width: 240,
		'&:hover': {
			backgroundColor: `${colors.lightBlue}`,
		},
	},
})((props) => <Button {...props} />);

export default StyledFillButton;
