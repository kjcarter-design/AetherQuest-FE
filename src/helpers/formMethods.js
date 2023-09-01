import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const handleEditCharacter = (character, setSelectedCharacter, setFormMode) => {
    setSelectedCharacter(character);
};

export const handleCreateCharacter = (setSelectedCharacter, setFormMode) => {
    setSelectedCharacter(null);
};
export const transformCharacterData = (characterData, classes = [], races = [], allWeapons = []) => {
    if (typeof characterData.class === 'string' && classes.length) {
        const classDetail = classes.find(c => c.index === characterData.class);
        if (classDetail) {
            characterData.class = {
                name: classDetail.name,
                url: classDetail.url
            };
        }
    }

    if (typeof characterData.race === 'string' && races.length) {
        const raceDetail = races.find(r => r.index === characterData.race);
        if (raceDetail) {
            characterData.race = {
                name: raceDetail.name,
                url: raceDetail.url
            };
        }
    }

    if (Array.isArray(characterData.weapons) && allWeapons.length) {
        characterData.weapons = characterData.weapons.map(weaponUrl => {
            const weaponDetail = allWeapons.find(w => w.url === weaponUrl);
            if (weaponDetail) {
                return {
                    name: weaponDetail.name,
                    url: weaponDetail.url
                };
            }
            return null;
        }).filter(Boolean);
    }

    return characterData;
};

export const handleSubmitCharacter = async (mode, characterData, userID, token, onSubmit, classes, races, allWeapons) => {
    console.trace('Token in handleSubmitCharacter:', token);

    characterData = transformCharacterData(characterData, classes, races, allWeapons);

    const requestData = {
        ...characterData,
        userId: userID,
        image: characterData.image
    };
    console.trace('Token before axios call:', token);
    console.log('Request Data:', requestData);
    console.log('Headers:', {
        'Authorization': `Bearer ${token}`
    });

    try {
        if (mode === 'edit' && characterData._id) {
            await axios.put(`${apiURL}/api/characters/${characterData._id}`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            await axios.post(`${apiURL}/api/characters`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        onSubmit();
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
            alert('Unauthorized: Please log in.');
        }
    }
};

export const deleteCharacter = async (characterId, token) => {
    try {
        await axios.delete(`${apiURL}/api/characters/${characterId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting character:', error);
    }
};

export const handleImageUpload = async (file, apiURL) => {
    try {
        const response = await axios.get(`${apiURL}/s3/generate-upload-url`, {
            params: {
                fileType: file.type,
            },
        });

        const { uploadURL } = response.data;
        await axios.put(uploadURL.signedUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
        });

        return uploadURL.objectUrl;
    } catch (error) {
        console.error("Error uploading the image:", error);
        return null;
    }
};

export const fetchClassSpellList = async (selectedClass) => {
    if (selectedClass?.spellcasting_ability) {
        try {
            const response = await axios.get(`https://api.open5e.com/spelllist/${selectedClass.name.toLowerCase()}`);
            return response.data.spells;
        } catch (error) {
            console.error("Error fetching spells:", error);
            return [];
        }
    }
    return [];
};

export const fetchSpellDetails = async (spellName) => {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`);
        const spellData = await response.json();
        return spellData;
    } catch (error) {
        console.error("Error fetching spell details:", error);
        return null;
    }
};
