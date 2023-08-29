import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './pages/RoutesComponent';
import Navigation from './components/Navigation';
import { UserProvider } from './hooks/useUser';
import store from './redux/store';
import aetherQuestTheme from './themes/aetherQuestTheme';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2', 
		},
		secondary: {
			main: '#dc004e', 
		},
	},
});

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={aetherQuestTheme}>
				<CssBaseline />
        <Router>
          <UserProvider>
					<Navigation />
            <RoutesComponent />
            </UserProvider>
				</Router>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
