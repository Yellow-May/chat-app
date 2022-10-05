import { AppContext, initialState } from 'context/store';
import { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';

const PersistAuth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const persistData = localStorage.getItem('chat-io');
	const context = useContext(AppContext);
	const state = context?.state;
	const dispatch = context?.dispatch;

	useEffect(() => {
		if (!state?.user && persistData) {
			dispatch?.({
				type: 'REGISTER',
				payload: JSON.parse(persistData) as typeof initialState,
			});
		}

		setIsLoading(false);
	}, []);

	return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistAuth;
