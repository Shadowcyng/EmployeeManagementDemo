const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};
const isEmail = (email) => {
	const emailRegEx =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSignupData = (data) => {
	let errors = {};
	if (isEmpty(data.email)) {
		errors.email = 'Email must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address';
	}
	if (isEmpty(data.password)) errors.password = 'Password must not be empty';
	if (data.password !== data.confirmPassword)
		errors.password = 'Password did not match';
	if (isEmpty(data.name)) errors.name = 'handle must not be empty';

	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateLoginData = (data) => {
	let errors = {};
	if (isEmpty(data.email)) errors.email = 'Email must not be empty';
	if (isEmpty(data.password)) errors.password = 'Password must not be empty';

	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateEmployeeDta = (data) => {
	let errors = {};
	if (isEmpty(data.name)) errors.name = 'Name must not be empty';
	if (isEmpty(data.department))
		errors.department = 'department must not be empty';
	if (isEmpty(data.email)) errors.email = 'Email must not be empty';
	if (!isEmail(data.email)) errors.email = 'Incorrect email format';
	if (isEmpty(data.phone)) errors.phone = 'Phone Number must not be empty';

	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
