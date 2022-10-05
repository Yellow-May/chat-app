import { initialState } from './store';

export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export default function reducer(
	state: typeof initialState,
	action: {
		type: 'REGISTER' | 'LOG_IN' | 'LOG_OUT';
		payload?: {
			user: { _id: string; email: string } | null;
			accessToken: string | null;
		};
	}
) {
	const { type, payload } = action;
	switch (type) {
		case LOG_IN:
			if (payload) {
				localStorage.setItem(
					'chat-io',
					JSON.stringify({
						user: payload?.user,
						accessToken: payload?.accessToken,
					})
				);
				return {
					...state,
					user: payload?.user,
					accessToken: payload?.accessToken,
				};
			}
			return { ...state };

		case REGISTER:
			if (payload) {
				localStorage.setItem(
					'chat-io',
					JSON.stringify({
						user: payload.user,
						accessToken: payload.accessToken,
					})
				);
				return {
					...state,
					user: payload.user,
					accessToken: payload.accessToken,
				};
			}
			return { ...state };

		case LOG_OUT:
			localStorage.removeItem('chat-io');
			return { ...state, user: null, accessToken: null };

		default:
			return state;
	}
}
