import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Login from './Login';
import Register from './Register';
import { registerUser, loginUser } from '../../Utils/api';
import RegisterSuccessDialog from './RegisterSuccessDialog';

import AuthNUserContext from '../../Components/Session/AuthNUserContext';
import UserProfile from '../Profile/UserProfile';

const Landing = (props) => {
	const context = useContext(AuthNUserContext);

	const [loggedIn, setLoggedIn] = useState(context.token ? true : false);
	const [loggedInUsername, setLoggedInUsername] = useState(
		context.user ? context.user.username : ''
	);
	const [registerUserDetails, setRegisterUserDetails] = useState({});
	const [registerModalOpen, setRegisterModalOpen] = useState(true);
	const [
		userRegisterSuccessModalOpen,
		setUserRegisterSuccessModalOpen,
	] = useState(false);
	const [userRegisterSuccess, setRegisterUserSuccess] = useState(false);
	const [loginUserDetails, setLoginUserDetails] = useState({});
	const [loginErrors, setLoginErrors] = useState({});
	const [registerErrors, setRegisterErrors] = useState({});

	const toggleRegisterModal = () => {
		setRegisterModalOpen(!registerModalOpen);
	};

	const toggleUserRegisterSuccessModalRegisterModal = () => {
		setUserRegisterSuccessModalOpen(!userRegisterSuccessModalOpen);
	};

	const registerNewUser = async () => {
		console.log(registerUserDetails);
		const userData = {
			firstName: registerUserDetails.firstName,
			lastName: registerUserDetails.lastName,
			username: registerUserDetails.username,
			email: registerUserDetails.email,
			password: registerUserDetails.password,
			confirmPassword: registerUserDetails.confirmPassword,
		};
		try {
			let result = await registerUser(userData);
			if (result.status == 200) {
				setRegisterUserSuccess(true);
			}
			toggleUserRegisterSuccessModalRegisterModal();
		} catch (error) {
			setRegisterErrors(error.response.data);
		}
	};

	const handleLogIn = async () => {
		const loginData = {
			email: loginUserDetails.loginEmail,
			password: loginUserDetails.loginPassword,
		};
		try {
			let res = await loginUser(loginData);
			context.setToken(res.data.token);
			setLoggedInUsername(res.data.username);
			setLoggedIn(true);
		} catch (error) {
			setLoginErrors(error.response.data);
		}
	};

	return (
		<Grid container direction="column" alignItems="center">
			<Switch>
				<Route path={['/register']}>
					<Register
						registerUserDetails={registerUserDetails}
						setRegisterUserDetails={setRegisterUserDetails}
						registerUser={registerNewUser}
						registerModalOpen={registerModalOpen}
						handleRegisterModalClose={toggleRegisterModal}
						registerErrors={registerErrors}
					/>
					<RegisterSuccessDialog
						userRegisterSuccessModalOpen={userRegisterSuccessModalOpen}
						userRegisterSuccess={userRegisterSuccess}
						toggleUserRegisterSuccessModalRegisterModal={
							toggleUserRegisterSuccessModalRegisterModal
						}
					/>
				</Route>
			</Switch>
			<Switch>
				<Route path={['/profile/:username']} component={UserProfile} />
				<Route path={['/', '/login']}>
					<Login
						registerModalOpen={registerModalOpen}
						handleRegisterModalOpen={toggleRegisterModal}
						loginUserDetails={loginUserDetails}
						setLoginUserDetails={setLoginUserDetails}
						handleLogIn={handleLogIn}
						loggedIn={loggedIn}
						loginErrors={loginErrors}
						loggedInUsername={loggedInUsername}
					/>
				</Route>
			</Switch>
		</Grid>
	);
};

export default Landing;
