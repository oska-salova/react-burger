import { post } from './net';

export async function resetPassword(email: string): Promise<boolean> {
	return post('password-reset', { email: email })
		.then(() => {
			return true;
		})
		.catch(() => {
			alert('Please try again');
			return false;
		});
}
