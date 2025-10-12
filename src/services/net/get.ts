import HTTPError, { ResponseError } from '../../model/net/http-error';

let abortController: AbortController | null = null;

export async function getData<T>(
	url: string,
): Promise<[typeof responseData, typeof responseError]> {
	let responseData: T | null = null;
	let responseError: ResponseError = null;

	try {
		abortController?.abort();
		abortController = new AbortController();

		const response = await fetch(url, { signal: abortController.signal });
		abortController = null;
		if (!response.ok) {
			throw new HTTPError(`HTTP error, status: ${response.status}`, response);
		}

		const result = await response.json();
		responseData = result;
	} catch (error: unknown) {
		const resultError = !(error instanceof Error)
			? new Error('Unexpected network error')
			: error;
		responseError = resultError;
	}

	return [responseData, responseError];
}
