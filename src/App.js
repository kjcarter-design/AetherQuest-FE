import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './pages/RoutesComponent';
import Navigation from './components/Navigation';
import store from './redux/store';
import aetherQuestTheme from './themes/aetherQuestTheme';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={aetherQuestTheme}>
                <CssBaseline />
                <Router>
                    <Navigation />
                    <RoutesComponent />
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
