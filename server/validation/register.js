const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.username = !isEmpty(data.username) ? data.username : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.confirmPassword = !isEmpty(data.confirmPassword)
		? data.confirmPassword
		: '';
	// Name checks
	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First Name field is required';
	}
	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	// Username check
	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.confirmPassword)) {
		errors.confirmPassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
