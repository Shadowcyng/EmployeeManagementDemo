const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	department: { type: String, required: false },
	email: { type: String, required: false },
	phone: { type: String, required: false },
	image: {
		type: String,
		required: false,
		default:
			'https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png',
	},
});

const employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;
