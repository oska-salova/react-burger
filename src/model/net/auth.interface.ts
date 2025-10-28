import { User } from '../user';
import { SuccessResponse } from './general.interface';

export interface RegisterUserResponse extends SuccessResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
