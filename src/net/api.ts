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
