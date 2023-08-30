// CharacterCard.js
import React from 'react';
import {
	Card,
	CardContent,
	Typography,

    Grid,
} from '@mui/material';

const classColors = {
	fighter: 'red',
	wizard: 'blue',
	warlock: 'purple',
	druid: 'green',
	// ... add other classes and their colors
};

const cardStyle = {
	width: '240px',
	height: '336px',
	borderRadius: '12px',
	boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	overflow: 'hidden',
};

function CharacterCard({ character, onDelete, onEdit, mode }) {
	const borderColor = classColors[character.class] || 'gray';


    return (
        <>
            <Card
                style={{
                    ...cardStyle,
                    borderColor: borderColor,
                    borderWidth: '4px',
                    borderStyle: 'solid',
                }}
                onClick={() => onEdit(character)}> 
                <CardContent>
                    <Grid container spacing={2}>
                        {/* Name and Class */}
                        <Grid item xs={6}>
                            <Typography variant='h6'>{character.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle1'>{character.class}</Typography>
                        </Grid>

                        {/* Image */}
                        <Grid item xs={12}>
                            {character.image && <img src={character.image} alt={character.name} style={{ width: '100%', height: 'auto' }} />}

                        </Grid>

                        {/* Armor and Enchanted */}
                        <Grid item xs={6}>
                            <Typography variant='body2'>Armor: {character.armor}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body2'>Magic Item: {character.enchantedItem}</Typography>
                        </Grid>

                        {/* Main Hand and Off Hand */}
                        <Grid item xs={6}>
                            <Typography variant='body2'>Main Hand: {character.mainHand}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body2'>Off Hand: {character.offHand}</Typography>
                        </Grid>

                        {/* Actions and Bonus Actions */}
                        <Grid item xs={12}>
                            <Typography variant='body2'>Actions: {character.actions}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body2'>Bonus Actions: {character.bonusActions}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CharacterCard;
