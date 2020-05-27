import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../Styles/colors';
import { Tabs } from '@material-ui/core';

const NavbarTabs = withStyles({
	root: {
		height: '100%',
	},
	flexContainer: {
		height: '100%',
	},
	indicator: {
		bottom: 0,
		width: '50%',
		backgroundColor: `${colors.lightBlue}`,
		height: 2,
	},
})((props) => <Tabs color="default" {...props} />);

export default NavbarTabs;
