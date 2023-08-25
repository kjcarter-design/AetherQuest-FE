// Characters.js

import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Grid, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CharacterForm from '../components/forms/CharacterForm';


function Characters() {
    const [characters, setCharacters] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('/api/characters');
                setCharacters(response.data);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCharacterCreated = () => {
        handleClose();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mb: 2 }}
            >
                Add New Character
            </Button>

            <Grid container spacing={3}>
                {characters?.map(character => (
                    <Grid item xs={12} sm={6} md={4} key={character._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {character.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Race: {character.race}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Class: {character.class}
                                </Typography>
                                {/* Add more character details as needed */}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="character-creation-modal"
            >
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    p: 4 
                }}>
                    <CharacterForm onSubmit={handleCharacterCreated} />
                </Box>
            </Modal>
        </Box>
    );
}

export default Characters;
