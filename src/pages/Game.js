import React, { useState, useEffect } from 'react';
import { Button, Dialog, Box, Grid, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CharacterCard from '../components/cards/CharacterCard';
import MonsterCard from '../components/cards/MonsterCard';
import { cardStyle } from '../components/styles/cardStyles';

function Game() {
	const user = useSelector((state) => state.user.userDetails);
	const auth = JSON.parse(localStorage.getItem('auth'));
	const storedToken = auth.token;

	const [formMode, setFormMode] = useState(null);
	const [open, setOpen] = useState(false);
	const apiURL = process.env.REACT_APP_API_URL;

	const [monster, setMonster] = useState([]);

/* 	const fetchGame = async () => {
		try {
			const response = await axios.get(
				`${apiURL}/api/users/${user._id}/characters`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setGame(response.data);
		} catch (error) {
			console.error('Error fetching characters:', error);
		}
  };

	useEffect(() => {
    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
 */

    const fetchMonster = async () => {
        try {
            const monsterResponse = await axios.get(`https://api.open5e.com/monsters/${monster}`);
            setMonster(monsterResponse);
        } catch (error) {
            console.error('Error fetching DnD data:', error);
        }
    }

    return (
			<Box >
				fetchMonster('bandit');
				<MonsterCard monster={monster} />
        </Box>
    );
}

export default Game;
