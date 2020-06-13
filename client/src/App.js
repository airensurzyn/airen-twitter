import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import withAuthentication from './Components/Session/withAuthentication';
import NotFound from './Views/NotFound';

import Landing from './Views/Landing/Landing';
import UserProfile from './Views/Profile/UserProfile';
import UserDashboard from './Views/UserDashboard';

function App() {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route path={'/profile/:username'} component={UserDashboard}></Route>
					<Route path={['/', 'login', 'register']} component={Landing}></Route>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default withAuthentication(App);
