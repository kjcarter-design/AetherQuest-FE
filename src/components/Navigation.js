import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { logout } from '../redux/slices/userSlice';

function Navigation() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const user = useSelector(state => state.user.userDetails);
	const isAuthenticated = !!token && !!Object.keys(user).length;

	const navigate = useNavigate();

	const handleSignOut = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<Link
					to='/'
					style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
				>
					<Typography variant='h6'>Home</Typography>
				</Link>
				{isAuthenticated ? (
					<>
						<Typography variant='body1' style={{ marginRight: '15px' }}>
							Welcome, {user.firstName}{' '}
						</Typography>
						<Button color='inherit' onClick={handleSignOut}>
							Sign Out
						</Button>
					</>
				) : (
					<Link
						to='/login'
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<Button color='inherit'>Login or Join Now</Button>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navigation;
