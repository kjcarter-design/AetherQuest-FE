import React, { useState, useRef, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
	handleSubmitCharacter,
	handleImageUpload,
	transformCharacterData,
} from '../../helpers/formMethods';
import { fetchDnDData } from '../../redux/slices/dndDataSlice';

const spellcasterClasses = [
	'Wizard',
	'Sorcerer',
	'Cleric',
	'Druid',
	'Bard',
	'Warlock',
	'Paladin',
	'Ranger',
];

const DRUID_WEAPONS = [
	{ index: 'clubs', name: 'Clubs', url: '/api/proficiencies/clubs' },
	{ index: 'daggers', name: 'Daggers', url: '/api/proficiencies/daggers' },
	{ index: 'javelins', name: 'Javelins', url: '/api/proficiencies/javelins' },
	{ index: 'maces', name: 'Maces', url: '/api/proficiencies/maces' },
	{
		index: 'quarterstaffs',
		name: 'Quarterstaffs',
		url: '/api/proficiencies/quarterstaffs',
	},
	{ index: 'sickles', name: 'Sickles', url: '/api/proficiencies/sickles' },
	{ index: 'spears', name: 'Spears', url: '/api/proficiencies/spears' },
	{ index: 'darts', name: 'Darts', url: '/api/proficiencies/darts' },
	{ index: 'slings', name: 'Slings', url: '/api/proficiencies/slings' },
	{
		index: 'scimitars',
		name: 'Scimitars',
		url: '/api/proficiencies/scimitars',
	},
];
const WIZARD_WEAPONS = [
	{ index: 'daggers', name: 'Daggers', url: '/api/proficiencies/daggers' },
	{ index: 'darts', name: 'Darts', url: '/api/proficiencies/darts' },
	{ index: 'slings', name: 'Slings', url: '/api/proficiencies/slings' },
	{ index: 'quarterstaffs', name: 'Quarterstaffs', url: '/api/proficiencies/quarterstaffs' },
	{ index: 'crossbows-light', name: 'Crossbows, light', url: '/api/proficiencies/crossbows-light' },
];

const SORCERER_WEAPONS = [
	{ index: 'daggers', name: 'Daggers', url: '/api/proficiencies/daggers' },
	{ index: 'darts', name: 'Darts', url: '/api/proficiencies/darts' },
	{ index: 'slings', name: 'Slings', url: '/api/proficiencies/slings' },
	{ index: 'quarterstaffs', name: 'Quarterstaffs', url: '/api/proficiencies/quarterstaffs' },
	{ index: 'crossbows-light', name: 'Crossbows, light', url: '/api/proficiencies/crossbows-light' },
];

function CharacterForm({ character = {}, onSubmit, onDelete, mode, token }) {
	const dispatch = useDispatch();
	const dndData = useSelector((state) => state.character.dndData);
	const userID = useSelector((state) => state.user.userDetails._id);
	const apiURL = process.env.REACT_APP_API_URL;
	const [isSpellcaster, setIsSpellcaster] = useState(false);
	const [proficientWeapons, setProficientWeapons] = useState([]);
	const [availableCantrips, setAvailableCantrips] = useState([]);
	const detailedClasses = JSON.parse(localStorage.getItem('detailedClasses'));
	const { races = [], classes = [], cantrips = {} } = dndData;

	const [characterData, setCharacterData] = useState({
		...(character?._id && { _id: character._id }),
		name: character?.name || '',
		race: character?.race || '',
		class: character?.class || '',
		image: character?.image || '',
		weapons: character?.weapons || [],
		cantrip: character?.cantrip || '',
		mainWeapon: character?.mainWeapon || '',
		offHandWeapon: character?.offHandWeapon || '',
	});
	const defaultValue = availableCantrips.find(
		(cantrip) => cantrip.name === characterData?.cantrip
	)
		? characterData?.cantrip
		: '';

	const inputFileRef = useRef(null);

	useEffect(() => {
		const storedRaces = localStorage.getItem('races');
		const storedClasses = localStorage.getItem('classes');
		const storedWeapons = localStorage.getItem('weapons');
		const storedCantrips = localStorage.getItem('cantrips');

		if (!storedRaces || !storedClasses || !storedWeapons || !storedCantrips) {
			if (token) {
				dispatch(fetchDnDData());
			}
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (characterData?.class === 'Druid') {
			setProficientWeapons(DRUID_WEAPONS);
		} else if (characterData?.class === 'Wizard') {
			setProficientWeapons(WIZARD_WEAPONS);
		} else if (characterData?.class === 'Sorcerer') {
			setProficientWeapons(SORCERER_WEAPONS)
		} else if (characterData?.class) {
			
			const classDetails = detailedClasses.find(
				(cls) => cls.name === characterData?.class
			);
			if (classDetails) {

				const hasSimpleWeapons = classDetails.proficiencies.some((prof) =>
					prof.name.includes('Simple Weapons')
				);
				const hasMartialWeapons = classDetails.proficiencies.some((prof) =>
					prof.name.includes('Martial Weapons')
				);

			

				let weaponsList = [];
				if (hasSimpleWeapons) {
					const simpleWeaponsFromLocalStorage = JSON.parse(
						localStorage.getItem('simpleWeapons')
					);
					if (simpleWeaponsFromLocalStorage) {
						
						weaponsList = [...weaponsList, ...simpleWeaponsFromLocalStorage];
					} else {
					}
				}
				if (hasMartialWeapons) {
					const martialWeaponsFromLocalStorage = JSON.parse(
						localStorage.getItem('martialWeapons')
					);
					if (martialWeaponsFromLocalStorage) {
						
						weaponsList = [...weaponsList, ...martialWeaponsFromLocalStorage];
					} else {
					}
				}

				setProficientWeapons(weaponsList);
			} else {
				console.log(`No details found for ${characterData?.class}.`);
			}
		}
	}, [characterData?.class]);

	useEffect(() => {
    setCharacterData(prevData => ({
        ...prevData,
        mainWeapon: '',
        offHandWeapon: '',
        weapons: [],
        cantrip: ''
    }));
	}, [characterData.class]);
	
	const handleWeaponChange = (event) => {
		const { name, value } = event.target;
		const weaponName = (characterData?.class === 'Druid' ? DRUID_WEAPONS : proficientWeapons).find(weapon => weapon.index === value)?.name;
		setCharacterData((prevData) => ({
				...prevData,
				[name]: weaponName,
				weapons: [...prevData.weapons, weaponName], 
		}));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCharacterData((prevData) => ({ ...prevData, [name]: value }));
	};


	useEffect(() => {
		if (spellcasterClasses.includes(characterData?.class)) {
			setIsSpellcaster(true);
			const classCantrips = JSON.parse(localStorage.getItem('classCantrips'));
			setAvailableCantrips(classCantrips[characterData?.class] || []);
		} else {
			setIsSpellcaster(false);
			setAvailableCantrips([]);
		}
	}, [characterData, isSpellcaster]);

	const handleImageChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageURL = await handleImageUpload(file, apiURL);
			if (imageURL) {
				setCharacterData((prevData) => ({ ...prevData, image: imageURL }));
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const classes = JSON.parse(localStorage.getItem('classes') || '[]');
		const races = JSON.parse(localStorage.getItem('races') || '[]');
		const allWeapons = JSON.parse(localStorage.getItem('allWeapons') || '[]');
		const classCantrips = JSON.parse(localStorage.getItem('classCantrips') || '[]');
		const transformedCharacterData = transformCharacterData(characterData, classes, races, allWeapons, classCantrips);
		handleSubmitCharacter(mode, transformedCharacterData, userID, token, onSubmit);
};

	const handleButtonClick = (event) => {
		event.stopPropagation();
		inputFileRef.current.click();
	};

useEffect(() => {
	console.log('Character Data: ', characterData)

}, [characterData]);

	return (
		<Box component='form' onSubmit={handleSubmit}>
			<Grid container spacing={2} justifyContent='center' alignItems='center'>
				{/* Name and Class */}
				<Grid item xs={6}>
					<TextField
						name='name'
						label='Name'
						fullWidth
						required
						value={characterData?.name}
						onChange={handleChange}
						margin='normal'
						size='small'
					/>
				</Grid>
				<Grid item xs={6}>
					{classes && classes.length > 0 && (
						<FormControl fullWidth margin='normal'>
							<InputLabel>Class</InputLabel>
							<Select
								name='class'
								value={characterData.class || characterData?.class} 
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
								value={characterData?.race}
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
				<Grid item xs={6}>
					<FormControl fullWidth margin='normal'>
						<InputLabel>Main Weapon</InputLabel>
						<Select
							name='mainWeapon'
							value={characterData?.mainWeapon || characterData.mainWeapon.name}
							onChange={handleWeaponChange}
						>
							{proficientWeapons.map((weapon) => (
								<MenuItem key={weapon.index} value={weapon.index}>
									{weapon.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* Conditional Rendering for Spellcasters vs Non-Spellcasters */}
				{isSpellcaster && availableCantrips.length > 0 ? (
					<Grid item xs={6}>
						<FormControl fullWidth margin='normal' size='small'>
							<InputLabel style={{ fontSize: '0.8rem' }}>Cantrip</InputLabel>
							<Select
								name='cantrip'
								value={defaultValue}
								onChange={handleChange}
							>
								{availableCantrips.map((cantrip) => (
									<MenuItem key={cantrip.index} value={cantrip.name}>
										{cantrip.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				) : (
					// For Non-Spellcasters: Off-Hand Weapon Selection
					<Grid item xs={6}>
						<FormControl fullWidth margin='normal'>
							<InputLabel>Off-Hand Weapon</InputLabel>
							<Select
								name='offHandWeapon'
								value={characterData?.offHandWeapon || characterData.offHandWeapon.name}
								onChange={handleWeaponChange}
							>
								{(characterData?.class === 'Druid'
									? DRUID_WEAPONS
									: proficientWeapons
								).map((weapon) => (
									<MenuItem key={weapon.index} value={weapon.index}>
										{weapon.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				)}

				{/* Save Button */}
				<Grid item xs={12}>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						sx={{ mt: 2, mb: 1, fontSize: '0.8rem' }}
					>
						Save Character
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
export default CharacterForm;
