import React from 'react';
import { Container, Typography } from '@mui/material';
import CharactersPage from './Characters';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector(state => state.user.userDetails);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {user.firstName}
      </Typography>
      <CharactersPage/>
    </Container>
  );
}

export default Profile;
