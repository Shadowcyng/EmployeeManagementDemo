import logo from './logo.svg';
import './App.css';
import Main from './Component/Main';
import Login from './Component/Login';
import SignUp from './Component/Siginup';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
	const [token, setToken] = useState();
	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, [token]);
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (token ? <Main /> : <Redirect to='/login' />)}
					/>
					<Route
						exact
						path='/login'
						render={() => (token ? <Redirect to='/' /> : <Login />)}
					/>
					<Route
						exact
						path='/signup'
						render={() => (token ? <Redirect to='/' /> : <SignUp />)}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
