import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useUser } from '../hooks/useUser';

function Navigation() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          <Typography variant="h6">Home</Typography>
        </Link>
        {isAuthenticated ? (
          <>
            <Typography variant="body1" style={{ marginRight: '15px' }}>
              Welcome, {user?.name}
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Login or Join Now</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
