enum LocalStorageItems {
	REFRESH_TOKEN = 'refreshToken',
	ACCESS_TOKEN = 'accessToken',
	RESET_PASSWORD = 'resetPassword',
}

const addAccessToken = (token: string): void => {
	localStorage.setItem(LocalStorageItems.ACCESS_TOKEN, token);
};

const removeAccessToken = (): void => {
	localStorage.removeItem(LocalStorageItems.ACCESS_TOKEN);
};

const getAccessToken = (): string | null => {
	return localStorage.getItem(LocalStorageItems.ACCESS_TOKEN);
};

const addRefreshToken = (token: string): void => {
	localStorage.setItem(LocalStorageItems.REFRESH_TOKEN, token);
};

const removeRefreshToken = (): void => {
	localStorage.removeItem(LocalStorageItems.REFRESH_TOKEN);
};

const getRefreshToken = (): string | null => {
	return localStorage.getItem(LocalStorageItems.REFRESH_TOKEN);
};

const addResetPassword = (): void => {
	localStorage.setItem(LocalStorageItems.RESET_PASSWORD, 'true');
};

const removeResetPassword = (): void => {
	localStorage.removeItem(LocalStorageItems.RESET_PASSWORD);
};

const getResetPassword = (): string | null => {
	return localStorage.getItem(LocalStorageItems.RESET_PASSWORD);
};

export const localStorageUtils = {
	addAccessToken: addAccessToken,
	removeAccessToken: removeAccessToken,
	getAccessToken: getAccessToken,
	addRefreshToken: addRefreshToken,
	removeRefreshToken: removeRefreshToken,
	getRefreshToken: getRefreshToken,
	addResetPassword: addResetPassword,
	removeResetPassword: removeResetPassword,
	getResetPassword: getResetPassword,
};
