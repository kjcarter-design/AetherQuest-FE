import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useSelector } from "react-redux";
import { compressImage } from "../../helpers/imageCompression";
import {
  deleteCharacter,
  handleSubmitCharacter,
} from "../../helpers/formMethods";
import DeleteIcon from "@mui/icons-material/Delete";

const spellcasterClasses = [
  "Wizard",
  "Sorcerer",
  "Cleric",
  "Druid",
  "Bard",
  "Warlock",
  "Paladin",
  "Ranger",
];

function CharacterForm({ character = {}, onSubmit, onDelete, mode, token }) {
  const userID = useSelector((state) => state.user.userDetails._id);
  const apiURL = process.env.REACT_APP_API_URL;
  const [characterData, setCharacterData] = useState({
    ...(character?._id && { _id: character._id }),
    name: character?.name || "",
    race: character?.race || "",
    class: character?.class || "",
    image: character?.image || "",
    mainWeapon: character?.mainWeapon || "",
    offHandWeapon: character?.offHandWeapon || "",
  });

  const [spells, setSpells] = useState([]);
  const [weapons, setWeapons] = useState([]);
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState('');
  const [races, setRaces] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    console.log("Weapons: ");
    console.log(weapons);
    console.log("Spells: ");
    console.log(spells);
  }, [weapons, spells]);

  useEffect(() => {
    const fetchDnDData = async () => {
      try {
        const classesResponse = await axios.get(
          "https://api.open5e.com/classes/"
        );
        const classesData = classesResponse.data.results.map((cls) => ({
          name: cls.name,
          desc: cls.desc,
          prof_weapons: cls.prof_weapons
            .split(", ")
            .filter(
              (weapon) =>
                weapon.includes("Simple") || weapon.includes("Martial")
            ),
        }));

        const racesResponse = await axios.get("https://api.open5e.com/races/");
        const racesData = racesResponse.data.results.map((race) => ({
          name: race.name,
          desc: race.desc,
        }));

        setClasses(classesData);
        setRaces(racesData);
      } catch (error) {
        console.error("Error fetching DnD data:", error);
      }
      
    };

    fetchDnDData();
	}, []);
	
	useEffect(() => {
    if (selectedClass) {
      const fetchWeapons = async () => {
        try {
          const weaponsResponse = await axios.get("https://api.open5e.com/weapons/");
          const allWeapons = weaponsResponse.data.results;
          const weaponProficiencies = classes.find(cls => cls.name === selectedClass)?.prof_weapons || [];
          const filteredWeaponsList = allWeapons.filter(weapon => weaponProficiencies.some(proficiency => weapon.category.includes(proficiency)));
          setWeapons(filteredWeaponsList);
        } catch (error) {
          console.error("Error fetching weapons:", error);
        }
      };
      fetchWeapons();

      if (spellcasterClasses.includes(selectedClass)) {
        const fetchSpells = async () => {
          try {
            const spellsResponse = await axios.get("https://api.open5e.com/spells/");
            const allSpells = spellsResponse.data.results;
            const cantrips = allSpells.filter(spell => spell.level === "Cantrip" && spell.dnd_class.includes(selectedClass));
            setSpells(cantrips);
          } catch (error) {
            console.error("Error fetching spells:", error);
          }
        };
        fetchSpells();
      }
    }
  }, [selectedClass]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "class") {
      setSelectedClass(value);
    }
    setCharacterData((prevData) => ({ ...prevData, [name]: value }));
};


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
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

        const imageURL = uploadURL.objectUrl;
        console.log("imgURL:" + imageURL);

        setCharacterData((prevData) => ({ ...prevData, image: imageURL }));
      } catch (error) {
        console.error("Error uploading the image:", error);
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

  const handleButtonClick = (event) => {
    event.stopPropagation();
    inputFileRef.current.click();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        padding: "8px",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Name and Class */}
        <Grid item xs={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            required
            value={characterData.name}
            onChange={handleChange}
            margin="normal"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          {classes.length > 0 && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Class</InputLabel>
              <Select
                name="class"
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
          <InputLabel style={{ fontSize: "0.8rem" }}>Upload Image</InputLabel>
          <IconButton
            color="primary"
            component="span"
            onClick={handleButtonClick}
          >
            <PhotoCamera />
            <input
              type="file"
              hidden
              ref={inputFileRef}
              onChange={handleImageChange}
            />
          </IconButton>
        </Grid>

        {/* Race */}
        <Grid item xs={12}>
          {races.length > 0 && (
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel style={{ fontSize: "0.8rem" }}>Race</InputLabel>
              <Select
                name="race"
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
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Main Weapon</InputLabel>
            <Select
              name="mainWeapon"
              value={characterData.mainWeapon}
              onChange={handleChange}
            >
              {weapons.map((weapon) => (
                <MenuItem key={weapon.slug} value={weapon.name}>
                  {weapon.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Conditional Rendering for Spellcasters vs Non-Spellcasters */}
        {spellcasterClasses.includes(characterData.class) ? (
          // For Spellcasters: Cantrip Selection
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Cantrip</InputLabel>
              <Select
                name="cantrip"
                value={characterData.cantrip}
                onChange={handleChange}
              >
                {spells.map((spell) => (
                  <MenuItem key={spell.slug} value={spell.name}>
                    {spell.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          // For Non-Spellcasters: Off-Hand Weapon Selection
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Off-Hand Weapon</InputLabel>
              <Select
                name="offHandWeapon"
                value={characterData.offHandWeapon || ""}
                onChange={handleChange}
              >
                {weapons.map((weapon) => (
                  <MenuItem key={weapon.slug} value={weapon.name}>
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
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 1, fontSize: "0.8rem" }}
          >
            Save Character
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CharacterForm;
