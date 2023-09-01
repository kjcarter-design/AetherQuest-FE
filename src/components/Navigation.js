import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Box,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { logout } from '../redux/slices/userSlice';
import LOGO from '../assets/AetherQuest (1).svg';

function Navigation() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const user = useSelector((state) => state.user.userDetails);
	const isAuthenticated = !!token && !!Object.keys(user).length;
	const avatarSrc = user && user.profileImage ? user.profileImage : null;
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width:'100%'}}>
					<Link
					to='/'
					style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
				>
					<IconButton aria-label='logo' disableRipple>
						<img
							src={LOGO}
							alt='AetherQuestLogo'
							style={{ width: '70px', margin: '0', padding: '0' }}
						/>
					</IconButton>
					</Link>
					<Box sx={{ width: '100%', display: 'flex', justifyContent:'center'}}>
					<Typography variant='h4'>
					AetherQuest: Heroes Unbound
				</Typography>	
					</Box>
				
				</Box>
				
				{isAuthenticated ? (
					<Box>
				<Avatar src={avatarSrc} alt='User Avatar' onClick={handleMenuOpen} />
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
							<MenuItem onClick={() => {
    handleMenuClose();
    navigate('/characters');
}}>
    Characters
</MenuItem>
<MenuItem onClick={() => {
    handleMenuClose();
    navigate('/games');
}}>
    Games
</MenuItem>
<MenuItem onClick={() => {
    handleMenuClose();
    navigate('/decks');
}}>
    Decks
</MenuItem>
<MenuItem onClick={() => {
    handleSignOut();
    handleMenuClose();  // Close the menu when signing out
}}>
    Sign Out
</MenuItem>
						</Menu>
						</Box>
					) : (
						<Link
						to='/login'
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						<Typography variant='h6'>Login or Join Now</Typography>
					</Link>
						)}
			</Toolbar>
			</AppBar>
	);
}

export default Navigation;
