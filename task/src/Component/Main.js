import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EmployeeCard from './EmployeeCard';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';
import { Button, Modal } from '@material-ui/core';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		textAlign: 'left',
	},
	toolbar: {
		paddingRight: 24,
		// keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},

	title: {
		flexGrow: 1,
	},
	logout: {
		margin: '10px',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		marginBlockEnd: '10px',
	},
	paperFirst: {
		fontWeight: 'bolder',
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		marginBlockEnd: '10px',
	},

	fixedHeight: {
		height: 240,
	},
}));

export default function Dashboard() {
	const classes = useStyles();
	const [employees, setEmployees] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		window.location.pathname = '/login';
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:5000/employee/data')
			.then((res) => res.data)
			.then((data) => {
				setEmployees(data);
				setError('');
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				setError(error.response.data);
			});
	}, []);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='absolute' className={clsx(classes.appBar)}>
				<Toolbar className={classes.toolbar}>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						Employee Management
					</Typography>
					<Button
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={handleOpen}
					>
						Add Employee
					</Button>

					<Button
						variant='contained'
						color='secondary'
						className={classes.logout}
						onClick={(e) => handleLogout(e)}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='xl' className={classes.container}>
					<Grid container spacing={3}>
						{/* Recent Orders */}
						<Grid item xs={12}>
							<Paper className={classes.paperFirst}>
								<EmployeeCard />
							</Paper>
							{loading ? (
								<h2 style={{ textAlign: 'center' }}>Loading...</h2>
							) : (
								employees.map((emp) => (
									<Paper key={emp._id} className={classes.paper}>
										<EmployeeCard
											name={emp.name}
											department={emp.department}
											phone={emp.phone}
											email={emp.email}
											image={emp.image}
										/>
									</Paper>
								))
							)}
						</Grid>
					</Grid>
					<Grid
						style={{ marginTop: '15px', color: 'red' }}
						container
						justify='center'
					>
						<Grid item>{error?.message && <div>{error.message}</div>}</Grid>
					</Grid>
				</Container>
			</main>
			<Modal open={open} onClose={handleClose} aria-labelledby='Add Employee'>
				<EmployeeForm handleClose={handleClose} />
			</Modal>
		</div>
	);
}
