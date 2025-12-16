import { User } from '../model/user';
import userReducer, { getUser, initialState, registerUser, updateUser, userSlice } from './user';

jest.mock('./store', () => ({
	__esModule: true,
	default: {
		store: {},
		dispatch: jest.fn(),
	},
}));

const testUser: User = {
	email: 'test@test.com',
	name: 'user',
};

describe('User reducers', () => {
	it('should return correct initial state', () => {
		expect(userReducer(undefined, { type: 'unknown' })).toEqual({
			user: null,
			pending: false,
			error: null,
		});
	});

	it('should set provided user on set action', () => {
		const prevState = initialState;
		const newState = userReducer(prevState, userSlice.actions.set(testUser));

		expect(newState).toEqual({
			...prevState,
			user: testUser,
		});
	});

	it('should delete user from store on delete action', () => {
		const prevState = { ...initialState, user: testUser };
		const newState = userReducer(prevState, userSlice.actions.delete());

		expect(newState).toEqual({
			...prevState,
			user: null,
		});
	});

	it('should set user and reset error/pending states when registerUser succeeded', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();

		const action = {
			type: registerUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBe(testUser);
		expect(newState.error).toBeNull();
		expect(newState.pending).toBe(false);
	});

	it('should set error and reset user/pending states when registerUser failed', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();
		expect(curState.error).toBeNull();

		const errorMessage = 'registerUser error';
		const action = {
			type: registerUser.rejected.type,
			payload: { message: errorMessage },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(errorMessage);
		expect(newState.pending).toBe(false);
	});

	it('should set pending to true and reset user/error when registerUser is in progress', () => {
		const curState = {
			...initialState,
			pending: false,
			user: testUser,
			error: 'error',
		};
		const action = {
			type: registerUser.pending.type,
		};
		const newState = userReducer(curState, action);
		expect(newState.pending).toBe(true);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(null);
	});

	it('should set user and reset error/pending states when getUser succeeded', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();

		const action = {
			type: getUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBe(testUser);
		expect(newState.error).toBeNull();
		expect(newState.pending).toBe(false);
	});

	it('should set error and reset user/pending states when getUser failed', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();
		expect(curState.error).toBeNull();

		const errorMessage = 'getUser error';
		const action = {
			type: getUser.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(errorMessage);
		expect(newState.pending).toBe(false);
	});

	it('should set pending to true and reset user/error when getUser is in progress', () => {
		const curState = {
			...initialState,
			pending: false,
			user: testUser,
			error: 'error',
		};
		const action = {
			type: getUser.pending.type,
		};
		const newState = userReducer(curState, action);
		expect(newState.pending).toBe(true);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(null);
	});

	it('should set user and reset error/pending states when updateUser succeeded', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();

		const action = {
			type: updateUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBe(testUser);
		expect(newState.error).toBeNull();
		expect(newState.pending).toBe(false);
	});

	it('should set error and reset user/pending states when updateUser failed', () => {
		const curState: typeof initialState = {
			...initialState,
			pending: true,
		};
		expect(curState.user).toBeNull();
		expect(curState.error).toBeNull();

		const errorMessage = 'updateUser error';
		const action = {
			type: updateUser.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = userReducer(curState, action);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(errorMessage);
		expect(newState.pending).toBe(false);
	});

	it('should set pending to true and reset user/error when updateUser is in progress', () => {
		const curState = {
			...initialState,
			pending: false,
			user: testUser,
			error: 'error',
		};
		const action = {
			type: updateUser.pending.type,
		};
		const newState = userReducer(curState, action);
		expect(newState.pending).toBe(true);
		expect(newState.user).toBeNull();
		expect(newState.error).toBe(null);
	});
});
