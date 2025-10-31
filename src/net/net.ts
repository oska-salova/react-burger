import { localStorageUtils } from '../model/local-stoage';
import { ErrorResponse, SuccessResponse } from '../model/net/general.interface';

const SERVER_URL = 'https://norma.education-services.ru'; //'https://norma.nomoreparties.space';
const REQUEST_BASE_URL = `${SERVER_URL}/api/`;

const AUTH_HEADER_ENDPOINTS = ['auth/user', 'orders'];

export async function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
	options = { ...options, method: 'GET' };
	return request<T>(endpoint, addAuthHeader(endpoint, options));
}

export async function post<T>(endpoint: string, body?: object): Promise<T> {
	const options = {
		body: JSON.stringify(body ?? null),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return request<T>(endpoint, addAuthHeader(endpoint, options));
}

export async function patch<T>(endpoint: string, body?: object): Promise<T> {
	const options = {
		body: JSON.stringify(body ?? null),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return request<T>(endpoint, addAuthHeader(endpoint, options));
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
	return fetch(`${REQUEST_BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess<T>)
		.catch(parseError);
}

function checkResponse(response: Response): Promise<SuccessResponse | ErrorResponse> {
	if (response.ok) {
		return response.json() as Promise<SuccessResponse>;
	}
	return response.json() as Promise<ErrorResponse>;
}

function checkSuccess<T>(result: SuccessResponse | ErrorResponse | null): Promise<T> {
	if (result?.success) {
		return Promise.resolve(result as T);
	}
	return Promise.reject(new Error(result?.message));
}

function parseError(error: unknown): never {
	const resultError =
		!(error instanceof Error) || error instanceof SyntaxError
			? new Error('Unexpected error')
			: error;

	throw resultError;
}

function addAuthHeader(endpoint: string, options: RequestInit): RequestInit {
	if (!AUTH_HEADER_ENDPOINTS.includes(endpoint)) {
		return options;
	}

	const headers = new Headers(options.headers);
	headers.append('Authorization', localStorageUtils.getAccessToken() ?? '');

	return { ...options, headers };
}
