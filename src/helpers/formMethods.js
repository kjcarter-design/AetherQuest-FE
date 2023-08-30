import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;


export const handleEditCharacter = (character, setSelectedCharacter, setFormMode) => {
    setSelectedCharacter(character);
};

export const handleCreateCharacter = (setSelectedCharacter, setFormMode) => {
    setSelectedCharacter(null);
};

export const handleSubmitCharacter = async (mode, characterData, userID, selectedImage, token, onSubmit) => {
    
    console.log("characterData.image:", characterData.image);
    const requestData = {
        ...characterData,
        userId: userID,
        image: characterData.image
    };

    try {
      if (mode === 'edit' && characterData._id) {
            // Update existing character
            const response = await axios.put(`${apiURL}/api/characters/${characterData._id}`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Character updated:', response.data);
        } else {
            // Create new character
            const response = await axios.post(`${apiURL}/api/characters`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Character created:', response.data);
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
