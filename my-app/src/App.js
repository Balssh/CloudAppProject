import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


const App = () => {
	return (
		<Routes>
			<Route path="/" element={
				<RequireAuth loginPath="/login">
					<Home />
				</RequireAuth>}>
			</Route>
			<Route path="/login" element={<Login />}>
			</Route>
			<Route path="/register" element={<Register />}>
			</Route>
		</Routes>
	);
}

export default App;