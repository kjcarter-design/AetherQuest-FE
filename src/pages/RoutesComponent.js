import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import Characters from './Characters';

function RoutesComponent() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/characters' element={ <Characters/>} />
		</Routes>
	);
}

export default RoutesComponent;
