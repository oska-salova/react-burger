interface GeneralResponse {
	success: boolean;
}

export interface SuccessResponse extends GeneralResponse {
	success: true;
}

export interface ErrorResponse extends GeneralResponse {
	success: false;
	message: string;
}
