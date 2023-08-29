import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../assets/Hero.png';
import { useSelector } from 'react-redux';
import { Box,Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

function Home() {
  const token = useSelector((state) => state.user.token);
	const user = useSelector((state) => state.user.userDetails);
  const isAuthenticated = !!token && !!Object.keys(user).length;
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" disableGutters sx={{padding: '3rem'}}>
      {isAuthenticated ?
        (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card style={{ backgroundColor: '#4a90e2', display:'flex', justifyContent:'center' }} onClick={() => {navigate('/characters')}}>
                <CardContent>
                  <Typography variant="h4">Characters</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ backgroundColor: '#9b59b6', display:'flex', justifyContent:'center' }} onClick={() => {navigate('/games')}}>
                <CardContent>
                  <Typography variant="h4">Games</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ backgroundColor: '#e74c3c', display:'flex', justifyContent:'center' }} onClick={() => {navigate('/decks')}}>
                <CardContent>
                  <Typography variant="h4">Decks</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Box mt={0} textAlign="center">
            <Box
              style={{
                backgroundImage: `url(${Hero})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Box style={{
                backgroundSize: 'cover',
                padding: '40px',
  
                backgroundColor: 'rgba(27, 26, 27, 0.50)',
              }}>
                <Typography variant="h1" gutterBottom color="whiteSmoke">
                  AetherQuest: Heroes Unbound
                </Typography>
                <Typography variant="h6" gutterBottom color="whiteSmoke">
                  Embark on a journey through woven realms where mystical cards dictate your fate.
                </Typography>
              </Box>
            
            </Box>
          
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
        )};
      </Container>
)
}

export default Home;
