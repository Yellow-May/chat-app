// import { io } from 'socket.io-client';
// io('http://localhost:5000');
import { Route, Routes } from 'react-router-dom';

import MessagePage from 'pages/Message';
import PersistAuth from 'components/auth/PersistAuth';
import AlreadyAuth from 'components/auth/AlreadyAuth';
import RequireAuth from 'components/auth/RequireAuth';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

const App = () => {
	return (
		<Routes>
			<Route element={<PersistAuth />}>
				<Route element={<AlreadyAuth />}>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path='/' element={<MessagePage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
