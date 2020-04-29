import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import Landing from './Views/Landing/Landing';

function App() {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route path={['/', 'login', 'register']} component={Landing}></Route>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
