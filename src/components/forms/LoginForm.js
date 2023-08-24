import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser as loginAction } from '../../redux/slices/userSlice'; // Rename the imported action
import { Button, TextField, Container, Typography } from '@mui/material';
import { useUser } from '../../hooks/useUser';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUser();
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Call your API to authenticate and then dispatch the login action
    // For demonstration purposes, I'm dispatching the login action directly
    dispatch(loginAction({ email, userData: { name: 'John Doe' } }));
  };

  const handleRegister = () => {
    // Call your API to register and then dispatch the login action
    // For demonstration purposes, I'm dispatching the login action directly
    dispatch(loginAction({ email, userData: { name: 'John Doe' } }));
  };

  return (
    <Container>
      <Typography variant="h4">Login or Register</Typography>
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
      >
        Login
      </Button>
      {/* If you want a Register button, you can uncomment the following line */}
      {/* <Button variant="contained" color="secondary" onClick={handleRegister}>Register</Button> */}
    </Container>
  );
}

export default LoginForm;
