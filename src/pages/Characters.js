import React, { useState, useEffect } from 'react';
import { Button, Dialog, Box, Grid, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CharacterForm from '../components/forms/CharacterForm';
import { useSelector } from 'react-redux';
import CharacterCard from '../components/cards/CharacterCard';
import { cardStyle } from '../components/styles/cardStyles';

function Characters() {
	const user = useSelector((state) => state.user.userDetails);
	const auth = JSON.parse(localStorage.getItem('auth'));
	const storedToken = auth.token;

	const [characters, setCharacters] = useState([]);
	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [formMode, setFormMode] = useState(null);
	const [open, setOpen] = useState(false);
	const apiURL = process.env.REACT_APP_API_URL;

	const fetchCharacters = async () => {
		try {
			const response = await axios.get(
				`${apiURL}/api/users/${user._id}/characters`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setCharacters(response.data);
		} catch (error) {
			console.error('Error fetching characters:', error);
		}
  };

	useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleDialog = (mode = null, character = null) => {
		setFormMode(mode);
		setSelectedCharacter(character);
		setOpen(!open);
	};
  
  const handleCharacterDeleted = () => {
    fetchCharacters();
    setOpen(false);
};


	const handleEdit = (character) => {
		setSelectedCharacter(character);
		setFormMode('edit');
		setOpen(true); 
	};

	const handleClose = () => {
		setOpen(false);
  };
  
  const handleCharacterCreated = () => {
    fetchCharacters();
    setOpen(false)
};

	return (
		<Box sx={{ p: 3 }}>
			<Button
				variant='contained'
				color='primary'
				startIcon={<AddIcon />}
				onClick={() => toggleDialog('new')}
				sx={{ mb: 2 }}
			>
				Add New Character
			</Button>

			<Grid container spacing={3}>
				{characters?.map((character) => (
					<Grid item xs={12} sm={6} md={4} key={character._id}>
						<CharacterCard
							character={character}
							onEdit={handleEdit} 
						/>
					</Grid>
				))}
			</Grid>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='character-creation-modal'
				PaperProps={{
					style: cardStyle,
				}}
			>
				<CharacterForm
          mode={formMode}
          character={selectedCharacter}
          onSubmit={handleCharacterCreated}
          onDelete={handleCharacterDeleted}
          token={storedToken}
				/>
			</Dialog>
		</Box>
	);
}

export default Characters;
