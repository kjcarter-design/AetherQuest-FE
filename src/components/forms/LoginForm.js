import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
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
    <Container component={Box} maxWidth="sm" py={3}>
      <Typography variant="h5" gutterBottom>
        Login or Register
      </Typography>
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        size="small" // Making the TextField a bit smaller
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        size="small" // Making the TextField a bit smaller
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginForm;
