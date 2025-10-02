import { useEffect, useState } from 'react';
import HTTPError from '../../model/net/http-error';

export function useFetch<T>(url: string): [typeof isLoading, typeof responseData, typeof error] {
	const [responseData, setResponseData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<HTTPError | Error | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					throw new HTTPError(`HTTP error, status: ${response.status}`, response);
				}

				const result = await response.json();
				setResponseData(result);
				setIsLoading(false);
			} catch (error: unknown) {
				const resultError = !(error instanceof Error)
					? new Error('Unexpected network error')
					: error.name === 'AbortError'
						? null
						: error;
				setError(resultError);
				setIsLoading(error instanceof Error && error.name === 'AbortError');
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, []);

	return [isLoading, responseData, error];
}
