import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import reducer from './reducer';

export const initialState: {
	user: { _id: string; email: string } | null;
	accessToken: string | null;
} = {
	user: null,
	accessToken: null,
};

const AppContext = createContext<{
	state: typeof initialState;
	dispatch: Dispatch<{
		type: 'REGISTER' | 'LOG_IN' | 'LOG_OUT';
		payload?: {
			user: {
				_id: string;
				email: string;
			} | null;
			accessToken: string | null;
		};
	}>;
} | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext };
export default AppProvider;
