import React, { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';


function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container>
            <Box display="flex" justifyContent="center" mb={2}>
                <Button variant="outlined" onClick={() => setShowLogin(true)}>Login</Button>
                <Button variant="outlined" onClick={() => setShowLogin(false)} style={{ marginLeft: '10px' }}>Sign Up</Button>
            </Box>
            {showLogin ? <LoginForm /> : <RegisterForm />}
        </Container>
    );
}

export default Login;
