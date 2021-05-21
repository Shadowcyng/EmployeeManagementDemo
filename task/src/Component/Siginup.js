import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
}));

export default function SignUp() {
	const classes = useStyles();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/user/signup', {
				name,
				email,
				password,
				confirmPassword,
			})
			.then((res) => res.data)
			.then((data) => {
				localStorage.setItem('token', data.token);
				setError('');
				window.location.pathname = '/';
			})
			.catch((e) => {
				setError(e?.response.data);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								error={error?.password ? true : false}
								helperText={error?.password && error?.password}
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								error={error?.confirmPassword ? true : false}
								helperText={error?.confirmPassword && error?.confirmPassword}
								name='confirmPassword'
								label='Confirm Password'
								type='password'
								id='confirmPassword'
								autoComplete='current-password'
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						onClick={(e) => handleSubmit(e)}
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
					<Grid
						style={{ marginTop: '15px', color: 'red' }}
						container
						justify='center'
					>
						<Grid item>{error?.message && <div>{error.message}</div>}</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
