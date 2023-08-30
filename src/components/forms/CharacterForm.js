import React, { useState, useEffect, useRef } from 'react';
import {
	TextField,
	Button,
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	IconButton,
	Grid,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { compressImage } from '../../helpers/imageCompression';
import {
	deleteCharacter,
	handleSubmitCharacter,
} from '../../helpers/formMethods';
import DeleteIcon from '@mui/icons-material/Delete';

function CharacterForm({ character = {}, onSubmit, onDelete, mode, token }) {
	const userID = useSelector((state) => state.user.userDetails._id);
	const apiURL = process.env.REACT_APP_API_URL;
	const [characterData, setCharacterData] = useState({
		...(character?._id && { _id: character._id }),
		name: character?.name || '',
		race: character?.race || '',
		class: character?.class || '',
		image: character?.image || '',
	});

	const [classes, setClasses] = useState([]);
	const [races, setRaces] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const inputFileRef = useRef(null);

	useEffect(() => {
		const fetchDnDData = async () => {
			try {
				const classesResponse = await axios.get(
					'https://www.dnd5eapi.co/api/classes'
				);
				const racesResponse = await axios.get(
					'https://www.dnd5eapi.co/api/races'
				);
				setClasses(classesResponse.data.results);
				setRaces(racesResponse.data.results);
			} catch (error) {
				console.error('Error fetching DnD data:', error);
			}
		};

		fetchDnDData();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCharacterData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const response = await axios.get(`${apiURL}/s3/generate-upload-url`, {
                params: {
                    fileType: file.type
                }
            });
            
            const { uploadURL } = response.data;
            await axios.put(uploadURL.signedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

					const imageURL = uploadURL.objectUrl;
console.log('imgURL:' + imageURL);
					
            setCharacterData((prevData) => ({ ...prevData, image: imageURL }));
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    }
};



	const handleSubmit = async (event) => {
		event.preventDefault();
		handleSubmitCharacter(
			mode,
			characterData,
			userID,
			selectedImage,
			token,
			onSubmit
		);
	};

	const handleDelete = async (characterId) => {
		console.log(characterId);
		await deleteCharacter(characterId, token);
		onDelete();
	};

	const handleButtonClick = (event) => {
    event.stopPropagation();
    inputFileRef.current.click();
}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{
				mt: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '90%',
				padding: '8px',
			}}
		>
			<Grid container spacing={2} justifyContent='center' alignItems='center'>
				{/* Name and Class */}
				<Grid item xs={6}>
					<TextField
						name='name'
						label='Name'
						fullWidth
						required
						value={characterData.name}
						onChange={handleChange}
						margin='normal'
						size='small'
					/>
				</Grid>
				<Grid item xs={6}>
					{classes.length > 0 && (
						<FormControl fullWidth margin='normal'>
							<InputLabel>Class</InputLabel>
							<Select
								name='class'
								value={characterData.class}
								onChange={handleChange}
							>
								{classes.map((cls) => (
									<MenuItem key={cls.index} value={cls.name}>
										{cls.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				</Grid>

				{/* Image */}
				<Grid item xs={12}>
					<InputLabel style={{ fontSize: '0.8rem' }}>Upload Image</InputLabel>
					<IconButton
						color='primary'
						component='span'
						onClick={handleButtonClick}
					>
						<PhotoCamera />
						<input
							type='file'
							hidden
							ref={inputFileRef}
							onChange={handleImageChange}
						/>
					</IconButton>
				</Grid>

				{/* Race */}
				<Grid item xs={12}>
					{races.length > 0 && (
						<FormControl fullWidth margin='normal' size='small'>
							<InputLabel style={{ fontSize: '0.8rem' }}>Race</InputLabel>
							<Select
								name='race'
								value={characterData.race}
								onChange={handleChange}
							>
								{races.map((race) => (
									<MenuItem key={race.index} value={race.name}>
										{race.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				</Grid>

				{/* Save Button */}
				<Grid item xs={12}>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						sx={{ mt: 2, mb: 1, fontSize: '0.8rem' }}
					>
						Save Character
					</Button>
				</Grid>
			</Grid>
			{mode === 'edit' && character._id && (
				<Grid item xs={12}>
					<IconButton
						aria-label='delete'
						onClick={() => handleDelete(character._id)}
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			)}
		</Box>
	);
}
export default CharacterForm;
