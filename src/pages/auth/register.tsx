import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../config';

function RegisterPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [form, setFormValue] = useState({ name: '', login: '', password: '' });
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// setIsLoading(true);
	};

	const isSubmitAvailable = Object.values(form).every(value => !!value) && !isLoading;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Регистрация</p>
			<Input
				type="text"
				placeholder="Имя"
				onChange={onChange}
				value={form.name}
				name="name"
				extraClass="mb-6"
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
			<EmailInput
				onChange={onChange}
				value={form.login}
				name="login"
				isIcon={false}
				extraClass="mb-6"
			/>
			<PasswordInput
				onChange={onChange}
				value={form.password}
				name="password"
				extraClass="mb-6"
			/>
			<Button
				htmlType="submit"
				type="primary"
				size="medium"
				extraClass="mb-20"
				disabled={!isSubmitAvailable}
			>
				Зарегистрироваться
			</Button>
			<div className="login-action mb-4">
				<p className="text text_type_main-default text_color_inactive">
					Уже зарегистрированы?
				</p>
				<Link to={AppRoutes.Login}>
					<p className="text text_type_main-default text_color_accent">Войти</p>
				</Link>
			</div>
		</form>
	);
}

export default RegisterPage;
