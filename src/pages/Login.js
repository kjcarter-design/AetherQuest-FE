import React, { useState } from 'react';
import { Container, Box, Typography, Tab, Tabs, Button } from '@mui/material';
import { Link } from 'react-router-dom';  // Importing the Link component
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';

function Login() {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={2} textAlign="center">
                <Typography variant="h5" gutterBottom>
                    Welcome to AetherQuest
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Join us on a wondrous journey through woven realms. 
                </Typography>

                <Box mt={2}>
                    <Tabs value={tabValue} onChange={handleChange} centered>
                        <Tab label="Login" />
                        <Tab label="Sign Up" />
                    </Tabs>
                </Box>

                {tabValue === 0 ? <LoginForm /> : <RegisterForm />}
            </Box>
        </Container>
    );
}

export default Login;
