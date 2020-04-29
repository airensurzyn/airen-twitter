import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import colors from '../Styles/colors';

const StyledOutlineButton = withStyles({
	root: {
		backgroundColor: `${colors.darkBlue}`,
		border: `1px solid ${colors.lightBlue}`,
		borderRadius: 20,
		color: `${colors.lightBlue}`,
		fontWeight: 'bold',
		height: 40,
		width: 240,
	},
})((props) => <Button {...props} />);

export default StyledOutlineButton;
