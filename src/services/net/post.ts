import { ResponseError } from '../../model/net/http-error';

let abortController: AbortController | null = null;

export async function setData<T>(
	url: string,
	data: object,
): Promise<[typeof responseData, typeof responseError]> {
	let responseData: T | null = null;
	let responseError: ResponseError = null;

	try {
		abortController?.abort();
		abortController = new AbortController();

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			signal: abortController.signal,
		});
		abortController = null;

		const result: T = await response.json();
		responseData = result;
	} catch (error: unknown) {
		const resultError = !(error instanceof Error)
			? new Error('Unexpected network error')
			: error;
		responseError = resultError;
	}

	return [responseData, responseError];
}
