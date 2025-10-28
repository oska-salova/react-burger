import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../config';

function LoginPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [form, setFormValue] = useState({ login: '', password: '' });
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
			<p className="text text_type_main-default mb-6">Вход</p>
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
				Войти
			</Button>
			<div className="login-action mb-4">
				<p className="text text_type_main-default text_color_inactive">
					Вы — новый пользователь?
				</p>
				<Link to={AppRoutes.Register}>
					<p className="text text_type_main-default text_color_accent">
						Зарегистрироваться
					</p>
				</Link>
			</div>
			<div className="login-action">
				<p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
				<Link to={AppRoutes.ForgotPassword}>
					<p className="text text_type_main-default text_color_accent">
						Восстановить пароль
					</p>
				</Link>
			</div>
		</form>
	);
}

export default LoginPage;
