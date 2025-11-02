import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';
import { logIn } from '../../services/auth';
import { useAppDispatch, useAppSelector } from '../../services/store';

function LoginPage() {
	const dispatch = useAppDispatch();
	const authState = useAppSelector(state => state.authReducer);

	const [form, setFormValue] = useState({ email: '', password: '' });
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(logIn(form));
	};

	const isSubmitAvailable = Object.values(form).every(value => !!value) && !authState.pending;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Вход</p>
			<EmailInput
				onChange={onChange}
				value={form.email}
				name="email"
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
			{authState.error && (
				<p className="text text_type_main-default text_color_error">{authState.error}</p>
			)}
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
