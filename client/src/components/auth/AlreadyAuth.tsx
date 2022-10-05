import { AppContext } from 'context/store';
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AlreadyAuth = () => {
	const context = useContext(AppContext);
	const state = context?.state;

	return state?.user ? <Navigate to='/' /> : <Outlet />;
};

export default AlreadyAuth;
