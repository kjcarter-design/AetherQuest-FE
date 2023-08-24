import React, { useState } from 'react';
import { Button, TextField, Typography, Alert } from '@mui/material';

function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call your API to register the user
        // Handle success and errors accordingly
    }

    return (
        <div>
            <Typography variant="h5">Register</Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField 
                id="email" 
                label="Email" 
                variant="outlined" 
                fullWidth 
                value={formData.email} 
                onChange={handleChange} 
            />
            <TextField 
                id="password" 
                label="Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                value={formData.password} 
                onChange={handleChange} 
            />
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Register
            </Button>
        </div>
    );
}

export default RegisterForm;
