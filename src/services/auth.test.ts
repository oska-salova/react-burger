import authReducer, { authSlice, logIn, logOut } from './auth';

jest.mock('./store', () => ({
	__esModule: true,
	default: {
		store: {},
		dispatch: jest.fn(),
	},
}));

describe('Auth reducers', () => {
	it('should return correct initial state', () => {
		expect(authReducer(undefined, { type: 'unknown' })).toEqual({
			isAuthenticated: false,
			pending: false,
			error: null,
		});
	});

	it('should set isAuthenticated according to provided in setAuth value', () => {
		const authenticatedState = {
			isAuthenticated: false,
			pending: false,
			error: null,
		};
		const notAuthenticatedState = {
			isAuthenticated: false,
			pending: false,
			error: null,
		};
		expect(authReducer(notAuthenticatedState, authSlice.actions.setAuth(true))).toEqual({
			...notAuthenticatedState,
			isAuthenticated: true,
		});
		expect(authReducer(authenticatedState, authSlice.actions.setAuth(false))).toEqual({
			...authenticatedState,
			isAuthenticated: false,
		});
	});

	it('should set isAuthenticated to true and reset loading/error when logIn succeeded', () => {
		const curState = {
			isAuthenticated: false,
			pending: false,
			error: null,
		};
		const action = { type: logIn.fulfilled.type };
		const newState = authReducer(curState, action);
		expect(newState).toEqual({ ...curState, isAuthenticated: true });
	});

	it('should set error message and reset pending/isAuthenticated when logIn failed', () => {
		const curState = {
			isAuthenticated: false,
			pending: false,
			error: null,
		};
		const errorMessage = 'logIn error';
		const action = {
			type: logIn.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = authReducer(curState, action);
		expect(newState).toEqual({ ...curState, error: errorMessage });
	});

	it('should set loading to true when logIn is in progress', () => {
		const curState = {
			isAuthenticated: true,
			pending: false,
			error: 'test error',
		};
		const action = {
			type: logIn.pending.type,
		};
		const newState = authReducer(curState, action);
		expect(newState.isAuthenticated).toBe(false);
		expect(newState.pending).toBe(true);
		expect(newState.error).toBe(null);
	});

	it('should set isAuthenticated to false and reset loading/error when logOut succeeded', () => {
		const curState = {
			isAuthenticated: true,
			pending: true,
			error: 'test error',
		};
		const action = { type: logOut.fulfilled.type };
		const newState = authReducer(curState, action);
		expect(newState.isAuthenticated).toBe(false);
		expect(newState.pending).toBe(false);
		expect(newState.error).toBeNull();
	});

	it('should reset error/pending/isAuthenticated when logOut failed', () => {
		const curState = {
			isAuthenticated: true,
			pending: true,
			error: null,
		};
		const errorMessage = 'logOut error';
		const action = {
			type: logOut.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = authReducer(curState, action);
		expect(newState.isAuthenticated).toBe(false);
		expect(newState.pending).toBe(false);
		expect(newState.error).toBe(null);
	});

	it('should set loading to true and reset error when logOut is in progress', () => {
		const curState = {
			isAuthenticated: true,
			pending: false,
			error: 'test error',
		};
		const action = {
			type: logOut.pending.type,
		};
		const newState = authReducer(curState, action);
		expect(newState.isAuthenticated).toBe(true);
		expect(newState.pending).toBe(true);
		expect(newState.error).toBeNull();
	});
});
