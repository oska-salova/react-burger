import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, store as appStore } from './store';
import { authSlice, logIn, logOut } from './auth';

describe('Auth reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should set isAuthenticated according to provided in setAuth value', () => {
		const authenticatedState: typeof rootInitialState = {
			...rootInitialState,
			authReducer: {
				...rootInitialState.authReducer,
				isAuthenticated: true,
			},
		};
		const notAuthenticatedState: typeof rootInitialState = {
			...rootInitialState,
			authReducer: {
				...rootInitialState.authReducer,
				isAuthenticated: false,
			},
		};
		expect(rootReducer(notAuthenticatedState, authSlice.actions.setAuth(true))).toEqual({
			...notAuthenticatedState,
			authReducer: {
				...notAuthenticatedState.authReducer,
				isAuthenticated: true,
			},
		});
		expect(rootReducer(authenticatedState, authSlice.actions.setAuth(false))).toEqual({
			...authenticatedState,
			authReducer: {
				...authenticatedState.authReducer,
				isAuthenticated: false,
			},
		});
	});

	it('should set isAuthenticated to true and reset loading/error when logIn succeeded', () => {
		const prevState = {
			...rootInitialState,
			authReducer: {
				...rootInitialState.authReducer,
				isAuthenticated: false,
			},
		};
		const action = { type: logIn.fulfilled.type };
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				isAuthenticated: true,
			},
		});
	});

	it('should set error message and reset pending/isAuthenticated when logIn failed', () => {
		const prevState = rootInitialState;
		const errorMessage = 'logIn error';
		const action = {
			type: logIn.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				error: errorMessage,
			},
		});
	});

	it('should set loading to true when logIn is in progress', () => {
		const prevState = {
			...rootInitialState,
			authReducer: {
				...rootInitialState.authReducer,
				isAuthenticated: true,
				pending: false,
				error: 'test error',
			},
		};
		const action = {
			type: logIn.pending.type,
		};
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				isAuthenticated: false,
				pending: true,
				error: null,
			},
		});
	});

	it('should set isAuthenticated to false and reset loading/error when logOut succeeded', () => {
		const prevState = {
			...rootInitialState,
			authReducer: {
				...rootInitialState.authReducer,
				isAuthenticated: true,
				pending: true,
				error: 'test error',
			},
		};
		const action = { type: logOut.fulfilled.type };
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				isAuthenticated: false,
				pending: false,
				error: null,
			},
		});
	});

	it('should reset error/pending/isAuthenticated when logOut failed', () => {
		const prevState = {
			...rootInitialState,
			authReducer: {
				isAuthenticated: true,
				pending: true,
				error: null,
			},
		};
		const errorMessage = 'logOut error';
		const action = {
			type: logOut.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				isAuthenticated: false,
				pending: false,
				error: null,
			},
		});
	});

	it('should set loading to true and reset error when logOut is in progress', () => {
		const prevState = {
			...rootInitialState,
			authReducer: {
				isAuthenticated: true,
				pending: false,
				error: 'test error',
			},
		};
		const action = {
			type: logOut.pending.type,
		};
		const newState = rootReducer(prevState, action);
		expect(newState).toEqual({
			...prevState,
			authReducer: {
				...prevState.authReducer,
				isAuthenticated: true,
				pending: true,
				error: null,
			},
		});
	});
});
