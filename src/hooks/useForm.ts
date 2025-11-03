import { ChangeEvent, useState } from 'react';

export function useForm<T>(inputValues = {} as T) {
	const [formValues, setFormValues] = useState(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};
	return { formValues, handleChange, setFormValues };
}
