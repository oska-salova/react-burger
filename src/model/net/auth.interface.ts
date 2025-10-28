import { User } from '../user';
import { SuccessResponse } from './general.interface';

export interface LogInRequest {
	email: string;
	password: string;
}

export interface LogInResponse extends SuccessResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export interface LogOutRequest {
	token: string;
}

export interface LogOutResponse extends SuccessResponse {
	message: string;
}

export interface RefreshTokenRequest {
	token: string;
}

export interface RefreshTokenResponse extends SuccessResponse {
	accessToken: string;
	refreshToken: string;
}
