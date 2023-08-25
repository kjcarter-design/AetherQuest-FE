import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Container, Typography, Alert, AlertTitle } from '@mui/material';
import {login, register } from './../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';


function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault(); 
    
        dispatch(register({ email, password, firstName, lastName }))
            .then((registerResponse) => {
                // Check if registration was successful
                if (registerResponse.payload && registerResponse.payload._id) {
                    // If successful, proceed with login
                    return dispatch(login({ email, password }));
                } else {
                    // If registration was not successful, throw an error to be caught in the catch block
                    throw new Error("Registration failed");
                }
            })
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                setError(err.message || "An error occurred");
            });
    };
    
    
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Register</Typography>
            {error && 
    <Alert severity="error" onClose={() => setError('')}>
        <AlertTitle>Error</AlertTitle>
        {error}
    </Alert>
}

            <form onSubmit={handleRegister}>
                <TextField 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    margin="normal"
                />
                <TextField 
                    label="Last Name" 
                    variant="outlined" 
                    fullWidth 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    margin="normal"
                />
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    margin="normal"
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    variant="outlined" 
                    fullWidth 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    margin="normal"
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    type="submit" 
                    style={{ marginTop: '16px' }}
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default RegisterForm;
