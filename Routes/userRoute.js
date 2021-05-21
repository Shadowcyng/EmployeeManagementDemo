const express = require('express');
const User = require('../models/userModel');
const { getToken } = require('../utill');
const { isAuth } = require('../auth');
const { validateLoginData, validateSignupData } = require('../validator');
const { response } = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const { valid, errors } = validateSignupData(req.body);
		if (!valid) return res.status(401).json(errors);
		const existingUser = User.findOne({ email: req.body.email });
		if (existingUser) {
			return res
				.status(401)
				.json({ message: 'user with this email already exist' });
		}

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		const newUser = await user.save();
		if (newUser) {
			return res.status(200).json({
				_id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				token: getToken(newUser),
			});
		} else {
			return res.status(401).json({ message: 'Invalid User Data' });
		}
	} catch (e) {
		console.log(e);
	}
});

router.post('/signin', async (req, res) => {
	const { valid, errors } = validateLoginData(req.body);
	if (!valid) {
		return res.status(401).json(errors);
	}
	const signinUser = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});
	if (signinUser) {
		return res.json({
			_id: signinUser.id,
			name: signinUser.name,
			email: signinUser.email,
			token: getToken(signinUser),
		});
	} else {
		return res.status(401).json({ message: 'Invalid email or password' });
	}
});
module.exports = router;
