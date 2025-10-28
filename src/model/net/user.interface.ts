import { User } from '../user';
import { SuccessResponse } from './general.interface';

export interface RegisterUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface RegisterUserResponse extends SuccessResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
