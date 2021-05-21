import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	main: {
		backgroundColor: '#fff',
		opacity: '0.9',
		minWidth: '500px',
	},
	controlButton: {
		textAlign: 'center',
	},
}));

export default function EmployeeForm({ handleClose }) {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');
	const [department, setDepartment] = useState('');
	const [image, setImage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/employee/addEmployee', {
				name,
				email,
				department,
				phone,
				image,
			})
			.then((res) => res.data)
			.then((data) => {
				setError('');
				handleClose();
				window.location.reload();
			})
			.catch((e) => {
				setError(e.response.data);
				console.log(e.response);
			});
	};

	return (
		<Container className={classes.main} component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<QueueIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Add Employee
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete='name'
								name='name'
								variant='outlined'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								error={error?.name ? true : false}
								helperText={error?.name && error?.name}
								fullWidth
								id='name'
								label='Name'
								autoFocus
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={error?.email ? true : false}
								helperText={error?.email && error?.email}
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								error={error?.phone ? true : false}
								helperText={error?.phone && error?.phone}
								id='phone'
								label='Phone Number'
								name='phone'
								autoComplete='phone'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								value={department}
								onChange={(e) => setDepartment(e.target.value)}
								error={error?.department ? true : false}
								helperText={error?.department && error?.department}
								id='department'
								label='Department'
								name='department'
								autoComplete='department'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								value={image}
								onChange={(e) => setImage(e.target.value)}
								error={error?.image ? true : false}
								helperText={error?.image && error?.image}
								id='image'
								label='Image Link'
								name='image'
								autoComplete='image'
							/>
						</Grid>
					</Grid>
					<Grid container spacing={8} className={classes.controlButton}>
						<Grid item xs={12} sm={6}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={(e) => handleSubmit(e)}
							>
								Submit
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								type='Cancel'
								variant='contained'
								color='secondary'
								className={classes.submit}
								onClick={handleClose}
							>
								Cancel
							</Button>
						</Grid>
					</Grid>
					<Grid
						style={{ marginTop: '15px', color: 'red' }}
						container
						justify='center'
					>
						<Grid item>{error?.message && <div>{error.message}</div>}</Grid>
					</Grid>
					<Grid container justify='flex-end'></Grid>
				</form>
			</div>
		</Container>
	);
}
