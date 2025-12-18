import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, store as appStore } from './store';
import { User } from '../model/user';
import { getUser, registerUser, updateUser, userSlice } from './user';

const testUser: User = {
	email: 'test@test.com',
	name: 'user',
};

describe('User reducers', () => {
	let store: typeof appStore;
	let rootInitialState: ReturnType<typeof rootReducer>;

	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		rootInitialState = store.getState();
	});

	it('should set provided user on set action', () => {
		const prevState = rootInitialState;
		const newState = rootReducer(prevState, userSlice.actions.set(testUser));

		expect(newState).toEqual({
			...prevState,
			userReducer: {
				...prevState.userReducer,
				user: testUser,
			},
		});
	});

	it('should delete user from store on delete action', () => {
		const prevState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				user: testUser,
			},
		};
		const newState = rootReducer(prevState, userSlice.actions.delete());

		expect(newState).toEqual({
			...prevState,
			userReducer: {
				...prevState.userReducer,
				user: null,
			},
		});
	});

	it('should set user and reset error/pending states when registerUser succeeded', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();

		const action = {
			type: registerUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: testUser,
				error: null,
				pending: false,
			},
		});
	});

	it('should set error and reset user/pending states when registerUser failed', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();
		expect(curState.userReducer.error).toBeNull();

		const errorMessage = 'registerUser error';
		const action = {
			type: registerUser.rejected.type,
			payload: { message: errorMessage },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: errorMessage,
				pending: false,
			},
		});
	});

	it('should set pending to true and reset user/error when registerUser is in progress', () => {
		const curState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: false,
				user: testUser,
				error: 'error',
			},
		};
		const action = {
			type: registerUser.pending.type,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: null,
				pending: true,
			},
		});
	});

	it('should set user and reset error/pending states when getUser succeeded', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();

		const action = {
			type: getUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: testUser,
				error: null,
				pending: false,
			},
		});
	});

	it('should set error and reset user/pending states when getUser failed', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();
		expect(curState.userReducer.error).toBeNull();

		const errorMessage = 'getUser error';
		const action = {
			type: getUser.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: errorMessage,
				pending: false,
			},
		});
	});

	it('should set pending to true and reset user/error when getUser is in progress', () => {
		const curState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: false,
				user: testUser,
				error: 'error',
			},
		};
		const action = {
			type: getUser.pending.type,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: null,
				pending: true,
			},
		});
	});

	it('should set user and reset error/pending states when updateUser succeeded', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();

		const action = {
			type: updateUser.fulfilled.type,
			payload: { user: testUser },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: testUser,
				error: null,
				pending: false,
			},
		});
	});

	it('should set error and reset user/pending states when updateUser failed', () => {
		const curState: typeof rootInitialState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: true,
			},
		};
		expect(curState.userReducer.user).toBeNull();
		expect(curState.userReducer.error).toBeNull();

		const errorMessage = 'updateUser error';
		const action = {
			type: updateUser.rejected.type,
			payload: { message: errorMessage },
			meta: { aborted: false },
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: errorMessage,
				pending: false,
			},
		});
	});

	it('should set pending to true and reset user/error when updateUser is in progress', () => {
		const curState = {
			...rootInitialState,
			userReducer: {
				...rootInitialState.userReducer,
				pending: false,
				user: testUser,
				error: 'error',
			},
		};
		const action = {
			type: updateUser.pending.type,
		};
		const newState = rootReducer(curState, action);
		expect(newState).toEqual({
			...curState,
			userReducer: {
				...curState.userReducer,
				user: null,
				error: null,
				pending: true,
			},
		});
	});
});
