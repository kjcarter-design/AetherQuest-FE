import React, { useState, useEffect } from 'react';
import {
	Button,
	Dialog,
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import CharacterForm from '../components/forms/CharacterForm';
import { useSelector } from 'react-redux';

function Characters() {
	const user = useSelector((state) => state.user.userDetails);
	const auth = JSON.parse(localStorage.getItem('auth'));
	const storedToken = auth.token;

	const [characters, setCharacters] = useState([]);
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

	const deleteCharacter = async (characterId) => {
		try {
			await axios.delete(`${apiURL}/api/characters/${characterId}`, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			});
			fetchCharacters();
		} catch (error) {
			console.error('Error deleting character');
		}
	};

	useEffect(() => {
		fetchCharacters();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCharacterCreated = () => {
		fetchCharacters();
		handleClose();
	};

	const handleDelete = (characterId) => {
		deleteCharacter(characterId);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Button
				variant='contained'
				color='primary'
				startIcon={<AddIcon />}
				onClick={handleOpen}
				sx={{ mb: 2 }}
			>
				Add New Character
			</Button>

			<Grid container spacing={3}>
				{characters?.map((character) => (
					<Grid item xs={12} sm={6} md={4} key={character._id}>
						<Card>
							<CardContent>
								<Typography variant='h5' component='div'>
									{character.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Race: {character.race}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Class: {character.class}
								</Typography>
								<IconButton
									aria-label='delete'
									onClick={() => {
										handleDelete(character._id);
									}}
								>
									<DeleteIcon />
								</IconButton>
								{/* Add more character details as needed */}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='character-creation-modal'
			>
				<Box
					sx={{
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<CharacterForm onSubmit={handleCharacterCreated} />
				</Box>
			</Dialog>
		</Box>
	);
}

export default Characters;
