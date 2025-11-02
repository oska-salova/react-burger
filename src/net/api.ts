import { localStorageUtils } from '../model/local-storage';
import { RefreshTokenResponse } from '../model/net/auth.interface';
import { post } from './net';

type ResetPasswordRequestBody = { email: string } | { password: string; token: string };

export async function resetPassword(
	data: ResetPasswordRequestBody,
	step: 'reset' | 'restore',
): Promise<boolean> {
	const endpoint = step === 'reset' ? 'password-reset' : 'password-reset/reset';
	return post(endpoint, data)
		.then(() => {
			return true;
		})
		.catch(() => {
			alert('Please try again');
			return false;
		});
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
	const refreshToken = localStorageUtils.getRefreshToken();
	if (!refreshToken) {
		return Promise.reject(new Error('No refresh token.'));
	}
	return post<RefreshTokenResponse>('auth/token', { token: refreshToken }).then(response => {
		localStorageUtils.addAccessToken(response.accessToken);
		localStorageUtils.addRefreshToken(response.refreshToken);
		return response;
	});
}
