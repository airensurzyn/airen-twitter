import React from 'react';
import { withStyles, Tab } from '@material-ui/core';

import colors from '../../Styles/colors';

const NavbarTab = withStyles({
	root: {
		fontSize: '.75rem',
		fontWeight: 'bold',
		opacity: 1,
	},
	selected: {
		color: `${colors.lightBlue}`,
	},
})((props) => <Tab disableRipple {...props} />);

export default NavbarTab;
