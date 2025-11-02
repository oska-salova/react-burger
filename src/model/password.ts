const RESET_PASSWORD_LOCAL_STORAGE_ITEM = 'resetPassword';

const enableReset = (): void => {
	localStorage.setItem(RESET_PASSWORD_LOCAL_STORAGE_ITEM, 'true');
};

const disableReset = (): void => {
	localStorage.removeItem(RESET_PASSWORD_LOCAL_STORAGE_ITEM);
};

const isResetAvailable = (): boolean => {
	return !!localStorage.getItem(RESET_PASSWORD_LOCAL_STORAGE_ITEM);
};

export const password = {
	enableReset: enableReset,
	disableReset: disableReset,
	isResetAvailable: isResetAvailable,
};
