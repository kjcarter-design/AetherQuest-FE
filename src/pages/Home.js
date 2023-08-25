import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Home() { 
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Welcome to AetherQuest
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
