const express = require('express');
const Employee = require('../models/employeeModel');
const { getToken } = require('../utill');
const { isAuth } = require('../auth');
const { validateEmployeeDta } = require('../validator');
const router = express.Router();

router.post('/addEmployee', isAuth, async (req, res) => {
	const { errors, valid } = validateEmployeeDta(req.body);
	if (!valid) {
		return res.status(401).json(errors);
	}
	const employee = new Employee({
		name: req.body.name,
		department: req.body.department,
		email: req.body.email,
		phone: req.body.phone,
		image: req.body.image,
	});
	const newEmployee = await employee.save();
	if (newEmployee) {
		return res.status(200).json({
			_id: newEmployee.id,
			name: newEmployee.name,
			email: newEmployee.email,
			department: newEmployee.department,
			phone: newEmployee.phone,
			image: newEmployee.image,
		});
	} else {
		return res.status(401).json({ message: 'Invalid Employee Data' });
	}
});

router.get('/data', async (req, res) => {
	const employees = await Employee.find({});
	if (employees) {
		return res.status(200).json(employees);
	} else {
		res.status(401).json({ message: 'Not Found' });
	}
});

module.exports = router;
