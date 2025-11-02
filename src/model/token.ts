enum LocalStorageItems {
	REFRESH_TOKEN = 'refreshToken',
	ACCESS_TOKEN = 'accessToken',
}

type TokensType = {
	accessToken: string;
	refreshToken: string;
};

export const TOKEN_REMOVED_EVENT = 'tokenRemoved';

const setTokens = (tokens: TokensType): void => {
	localStorage.setItem(LocalStorageItems.ACCESS_TOKEN, tokens.accessToken);
	localStorage.setItem(LocalStorageItems.REFRESH_TOKEN, tokens.refreshToken);
};

const removeTokens = (): void => {
	localStorage.removeItem(LocalStorageItems.ACCESS_TOKEN);
	localStorage.removeItem(LocalStorageItems.REFRESH_TOKEN);
	window.dispatchEvent(new Event(TOKEN_REMOVED_EVENT));
};

const getAccessToken = (): string | null => {
	return localStorage.getItem(LocalStorageItems.ACCESS_TOKEN);
};

const getRefreshToken = (): string | null => {
	return localStorage.getItem(LocalStorageItems.REFRESH_TOKEN);
};

export const token = {
	setTokens: setTokens,
	removeTokens: removeTokens,
	getAccessToken: getAccessToken,
	getRefreshToken: getRefreshToken,
};
