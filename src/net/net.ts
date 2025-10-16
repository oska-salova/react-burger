export const SERVER_URL = 'https://norma.nomoreparties.space';

export async function get<T, S = void>(endpoint: string, options?: RequestInit): Promise<T | S> {
	return request<T, S>(endpoint, { ...options, method: 'GET' });
}

export async function post<T, S = void>(endpoint: string, options?: RequestInit): Promise<T | S> {
	return request<T, S>(endpoint, {
		...options,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
}

async function request<T, S>(endpoint: string, options?: RequestInit): Promise<T | S> {
	return fetch(`${SERVER_URL}${endpoint}`, options)
		.then(checkResponse<T, S>)
		.catch(parseError);
}

function checkResponse<T, S>(response: Response): Promise<T | S> {
	if (!response.ok) {
		return response.json() as Promise<S>;
	}
	return response.json() as Promise<T>;
}

function parseError(error: unknown): never {
	const resultError =
		!(error instanceof Error) || error instanceof SyntaxError
			? new Error('Unexpected error')
			: error;

	throw resultError;
}
