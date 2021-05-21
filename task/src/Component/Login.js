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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/user/signin', { email, password })
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				setError('');
				window.location.pathname = '/';
			})
			.catch((e) => {
				setError(e.response.data);
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
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						error={error?.email ? true : false}
						helperText={error?.email && error.email}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						autoComplete='email'
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						error={error?.password ? true : false}
						helperText={error?.password && error.password}
						name='password'
						label='Password'
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						autoComplete='current-password'
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={(e) => handleClick(e)}
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='/signup' variant='body2'>
								{"Don't have an account? Sign Up"}
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
};

export default Login;
