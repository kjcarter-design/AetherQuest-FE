import React, { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { deleteCharacter } from "../../helpers/formMethods";
import cardTexture from "../../assets/abstract-geometric-background-shapes-texture.jpg";

// const classColors = {
//   fighter: "red",
//   wizard: "blue",
//   warlock: "purple",
//     druid: "green",
//   bard: 'yellow'
//   // ... add other classes and their colors
// };

const cardStyle = {
  width: "240px",
  height: "336px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  position: "relative",
  color: "black",
  textShadow:
    ".5px 0 gold, -.5px .0 gold, 0 1px gold, 0 -1px gold, .5px .5px gold, -.5px -.5px gold, -.5px -.5px gold, -.5px .5px gold",
};

function CharacterCard({ character, onDelete, onEdit, mode, token }) {
  const [isHovered, setIsHovered] = useState(false);
  const borderColor = "gold";

  const handleDelete = async (characterId) => {
    console.log(characterId);
    await deleteCharacter(characterId, token);
    onDelete();
  };

  return (
    <>
      <Card
        style={{
          ...cardStyle,
          borderColor: borderColor,
          borderWidth: "4px",
          borderStyle: "solid",
          backgroundImage: `url(${cardTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "end",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <Grid container spacing={1}>
            {/* Name and Class */}
            <Container
              disableGutters
              sx={{
                display: "flex",
                padding: ".5rem",
                justifyContent: "space-around",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderStyle: "inset",
                  borderWidth: "2px",
                  borderColor: "gold",
                  backgroundColor: "gray",
                }}
              >
                <Typography variant="caption">{character.name}</Typography>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderStyle: "inset",
                  borderWidth: "2px",
                  borderColor: "gold",
                  backgroundColor: "gray",
                }}
              >
                <Typography variant="caption">
                  {character.class} lvl: {character.level}
                </Typography>
              </Grid>
            </Container>

            {/* Image */}
            <Grid item xs={12}>
              <Container
                sx={{
                  width: "100%",
                  height: "15vh",
                  overflow: "hidden",
                  borderStyle: "inset",
                  borderWidth: "2px",
                  borderColor: "gold",
                  backgroundImage: `url(${character.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "end",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    position: "absolute",
                    bottom: 100,
                    left: 23.5,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem",
                    borderStyle: "inset",
                    borderWidth: "2px",
                    borderColor: "gold",
                    backgroundColor: "gray",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {/* <Typography variant="caption" noWrap>Actions:</Typography> */}
                    {Array(character.actions)
                      .fill()
                      .map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "green",
                            margin: "0 2px",
                          }}
                        />
                      ))}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {/* <Typography variant="caption" noWrap>Bonus Actions:</Typography> */}
                    {Array(character.bonusActions)
                      .fill()
                      .map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 8,
                            height: 8,
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                            backgroundColor: "red",
                            margin: "0 2px",
                          }}
                        />
                      ))}
                  </Box>
                </Box>
              </Container>
            </Grid>

            <Container>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderStyle: "inset",
                  borderWidth: "2px",
                  borderColor: "gold",
                  backgroundColor: "gray",
                }}
              >
                {/* Armor and Enchanted */}
                <Grid item xs={6}>
                  <IconButton>
                    <ShieldIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {/* Magic Item: {character.enchantedItem} */}
                  </Typography>
                </Grid>
              </Box>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderStyle: "inset",
                  borderWidth: "2px",
                  borderColor: "gold",
                  backgroundColor: "gray",
                }}
              >
                {/* Main Hand and Off Hand */}
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {/* Main Hand: {character.mainHand} */}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    {/* Off Hand: {character.offHand} */}
                  </Typography>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </CardContent>
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering the card's onClick
                onEdit(character);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering the card's onClick
                handleDelete(character._id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}

export default CharacterCard;
