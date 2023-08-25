import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector(state => state.user.userDetails);
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Welcome to AetherQuest
        </Typography>
        <Typography variant="body1">
          Hello, {user.firstName}
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
