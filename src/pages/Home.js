import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

function Home() { 
  return (
    <Container>
      <Box mt={8} textAlign="center">
        <Typography variant="h1" gutterBottom>
          AetherQuest: Heroes Unbound
        </Typography>
        <Typography variant="h2" gutterBottom>
          Embark on a journey through woven realms where mystical cards dictate your fate.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Dive deep into the Aether, where heroes rise, tales unfold, and every card drawn brings you closer to your destiny. Your quest awaits.
        </Typography>

        <Box mt={4}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained" color="primary">Start Your Journey</Button>
                </Link>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">Learn More</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
