// CharacterForm.jsx

import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CharacterForm({ onSubmit }) {
	const token = useSelector((state) => state.user.token);

    const [characterData, setCharacterData] = useState({
        name: '',
        race: '',
        class: '',
        level: 1,
        // ... add other fields as needed
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacterData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const apiURL = process.env.REACT_APP_API_URL;
  
    
      try {
          const response = await axios.post(`${apiURL}/api/characters`, characterData, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          console.log('Character created:', response.data);
          onSubmit();
      } catch (error) {
          console.error('Error creating character:', error);
          if (error.response && error.response.status === 401) {
              // Redirect to login or show an authentication error message
              alert('Unauthorized: Please log in to create a character.');
              // Optionally, you can redirect the user to the login page
              // window.location.href = '/login'; // Replace with your login route
          }
      }
  };
  

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField name="name" label="Name" fullWidth required value={characterData.name} onChange={handleChange} margin="normal" />
                <TextField name="race" label="Race" fullWidth required value={characterData.race} onChange={handleChange} margin="normal" />
                <TextField name="class" label="Class" fullWidth required value={characterData.class} onChange={handleChange} margin="normal" />
                <TextField name="level" label="Level" fullWidth type="number" value={characterData.level} onChange={handleChange} margin="normal" />
                {/* Add other fields as needed */}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                    Create Character
                </Button>
            </Box>
        </Container>
    );
}

export default CharacterForm;
