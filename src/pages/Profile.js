import React from 'react';
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector(state => state.user.userDetails);

  return (
    <Container>
      
    </Container>
  );
}

export default Profile;
