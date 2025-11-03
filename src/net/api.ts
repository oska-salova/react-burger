import { token } from '../model/token';
import { RefreshTokenResponse } from '../model/net/auth.interface';
import { post } from './net';

export type ResetPasswordRequest = { email: string };
export type RestorePasswordRequest = { password: string; token: string };
type ResetPasswordRequestBody = ResetPasswordRequest | RestorePasswordRequest;

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
	const refreshToken = token.getRefreshToken();
	if (!refreshToken) {
		return Promise.reject(new Error('No refresh token.'));
	}
	return post<RefreshTokenResponse>('auth/token', { token: refreshToken })
		.then(response => {
			token.setTokens({
				accessToken: response.accessToken,
				refreshToken: response.refreshToken,
			});
			return response;
		})
		.catch((error: unknown) => {
			token.removeTokens();
			throw error;
		});
}
