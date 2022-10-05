import { AppContext } from 'context/store';
import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const RequireAuth = () => {
	const location = useLocation();
	const context = useContext(AppContext);
	const state = context?.state;

	return state?.user ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuth;
