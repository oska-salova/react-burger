import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';

function LoginPage() {
	const [loginValue, setLoginValue] = useState('');
	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginValue(e.target.value);
	};

	const [passwordValue, setPasswordValue] = useState('');
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value);
	};

	return (
		<div className="flex-center login-container">
			<p className="text text_type_main-default mb-6">Вход</p>
			<EmailInput
				onChange={onLoginChange}
				value={loginValue}
				name="login"
				isIcon={false}
				extraClass="mb-6"
			/>
			<PasswordInput
				onChange={onPasswordChange}
				value={passwordValue}
				name="password"
				extraClass="mb-6"
			/>
			<Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
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
		</div>
	);
}

export default LoginPage;
