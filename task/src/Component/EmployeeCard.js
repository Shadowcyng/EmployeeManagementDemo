import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const EmployeeCard = ({
	name = ' Employee NAME',
	email = 'Employee EMAIL',
	department = 'DEPARTMENT',
	phone = 'PHONE Number',
	image,
}) => {
	const classes = useStyles();

	return (
		<div className='employee-card'>
			<span>
				<Avatar alt='employee image' src={image} />
			</span>
			<span>{name.toLocaleUpperCase()}</span>
			<span>{email.toLocaleUpperCase()}</span>
			<span>{phone.toLocaleUpperCase()}</span>
			<span>{department.toLocaleUpperCase()}</span>
		</div>
	);
};

export default EmployeeCard;
