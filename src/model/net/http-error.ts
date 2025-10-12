class HTTPError extends Error {
	response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.name = 'HTTPError';
		this.response = response;
	}
}

export default HTTPError;

export type ResponseError = HTTPError | Error | null;

export function isAbortError(error: Error): boolean {
	return error.name === 'AbortError';
}
