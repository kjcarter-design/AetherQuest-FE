import { createTheme } from '@mui/material/styles';

const aetherQuestTheme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2', // Ethereal blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9b59b6', // Mystic purple
      contrastText: '#ffffff',
    },
    error: {
      main: '#e74c3c',
    },
    background: {
      default: '#f4f6f8', // Neutral background
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50', // Dark text color
      secondary: '#7f8c8d', // Lighter text color
    },
  },
  typography: {
    fontFamily: 'Cinzel Decorative, sans-serif',
    h1: {
      fontFamily: 'Cinzel Decorative, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Merriweather, serif',
      fontSize: '2rem',
      fontWeight: 500,
    },
    // ... other typography settings
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          padding: '10px 20px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#4a90e2', // Override if needed
          },
        },
        // ... other button variants
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    // ... other component customizations
  },
});

export default aetherQuestTheme;
