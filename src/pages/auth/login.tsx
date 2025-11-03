import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';
import { logIn } from '../../services/auth';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';
import { LogInRequest } from '../../model/net/auth.interface';

function LoginPage() {
	const dispatch = useAppDispatch();
	const authState = useAppSelector(state => state.authReducer);
	const { formValues, handleChange } = useForm<LogInRequest>({ email: '', password: '' });

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(logIn(formValues));
	};

	const isSubmitAvailable =
		Object.values(formValues).every(value => !!value) && !authState.pending;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Вход</p>
			<EmailInput
				onChange={handleChange}
				value={formValues.email}
				name="email"
				isIcon={false}
				extraClass="mb-6"
			/>
			<PasswordInput
				onChange={handleChange}
				value={formValues.password}
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
