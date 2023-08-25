import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Container, Typography } from '@mui/material';
import { login } from './../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password }));
      navigate('/'); // Navigate to the home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
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
