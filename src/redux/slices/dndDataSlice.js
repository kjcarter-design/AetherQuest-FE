import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const dndAPIUrl = 'https://www.dnd5eapi.co';
const apiURL = process.env.REACT_APP_API_URL;
// Async thunk for fetching character data
export const fetchCharacterData = createAsyncThunk(
	'character/fetchData',
	async (_, { getState }) => {
		const user = getState().user.userDetails;
		const response = await fetch(`${apiURL}/users/${user.userId}`);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message);
		}
	}
);

// Async thunk for fetching DnD data
export const fetchDnDData = createAsyncThunk(
	'character/fetchDnDData',
	async () => {
		const racesData = await axios.get(`${dndAPIUrl}/api/races`);
		localStorage.setItem('races', JSON.stringify(racesData.data.results));

		const classesData = await axios.get(`${dndAPIUrl}/api/classes`);
        localStorage.setItem('classes', JSON.stringify(classesData.data.results));
        
		const detailedClasses = await Promise.all(
			classesData.data.results.map(async (classItem) => {  // Corrected here
                const classDetail = await axios.get(`${dndAPIUrl}${classItem.url}`);
				return classDetail.data;
			})
		);
		localStorage.setItem(
			'detailedClasses',
			JSON.stringify(detailedClasses)
		);

		const weaponsData = await axios.get(
			`${dndAPIUrl}/api/equipment-categories/weapon`
		);
		const allWeapons = weaponsData.data.equipment || weaponsData.data;
		localStorage.setItem('allWeapons', JSON.stringify(allWeapons));

		const detailedWeapons = await Promise.all(
			allWeapons.map(async (weapon) => {
				const weaponDetail = await axios.get(`${dndAPIUrl}${weapon.url}`);
				return weaponDetail.data;
			})
		);
		const martialWeapons = detailedWeapons.filter(
			(weapon) => weapon.weapon_category === 'Martial'
		);
		const simpleWeapons = detailedWeapons.filter(
			(weapon) => weapon.weapon_category === 'Simple'
		);

		localStorage.setItem('martialWeapons', JSON.stringify(martialWeapons));
		localStorage.setItem('simpleWeapons', JSON.stringify(simpleWeapons));

        const cantripsData = await axios.get(`${dndAPIUrl}/api/spells/?level=0`);
		localStorage.setItem('cantrips', JSON.stringify(cantripsData.data.results)); 

		const detailedCantrips = await Promise.all(
			cantripsData.data.results.map(async (cantrip) => {
				const cantripDetail = await axios.get(`${dndAPIUrl}${cantrip.url}`);
				return cantripDetail.data;
			})
		);

		const classCantrips = {};
		detailedClasses.forEach((cls) => {
			classCantrips[cls.name] = detailedCantrips.filter((cantrip) =>
				cantrip.classes.some((c) => c.name === cls.name)
			);
		});

		localStorage.setItem('classCantrips', JSON.stringify(classCantrips));
		

		const monstersData = await axios.get(`${dndAPIUrl}/api/monsters`);
        localStorage.setItem('monsters', JSON.stringify(monstersData.data.results));
        
		const detailedMonsters = await Promise.all(
			monstersData.data.results.map(async (monster) => { 
                const monsterDetail = await axios.get(`${dndAPIUrl}${monster.url}`);
				return monsterDetail.data;
			})
		);
		localStorage.setItem(
			'detailedMonsters',
			JSON.stringify(detailedMonsters)
		);

		return {
			races: racesData.data.results,
			classes: classesData.data.results,
			weapons: weaponsData.data.equipment || weaponsData.data,
            cantrips: cantripsData.data.results,
            classCantrips: classCantrips,
		};
	}
);

const dndDataSlice = createSlice({
	name: 'character',
	initialState: {
		characterData: null,
		dndData: {
			races: [],
			classes: [],
			weapons: [],
			cantrips: [],
		},
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCharacterData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCharacterData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.characterData = action.payload;
			})
			.addCase(fetchCharacterData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(fetchDnDData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchDnDData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.dndData.races = action.payload.races;
				state.dndData.classes = action.payload.classes;
				state.dndData.weapons = action.payload.weapons;
				state.dndData.cantrips = action.payload.cantrips;
			})
			.addCase(fetchDnDData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export default dndDataSlice.reducer;
