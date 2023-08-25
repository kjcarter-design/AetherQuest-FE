import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Profile from './Profile';

function Home() { 
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Welcome to AetherQuest
        </Typography>
        <Typography variant="body1">
         <Profile/>
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
