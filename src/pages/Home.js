import React from 'react';
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
        <Typography variant="body1">
          This is the home page. Navigate using the links above.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
