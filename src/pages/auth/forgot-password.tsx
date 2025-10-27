import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';

function ForgotPasswordPage() {
	const [loginValue, setLoginValue] = useState('');
	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginValue(e.target.value);
	};

	return (
		<div className="flex-center login-container">
			<p className="text text_type_main-default mb-6">Восстановление пароля</p>
			<EmailInput
				placeholder="Укажите e-mail"
				onChange={onLoginChange}
				value={loginValue}
				name="login"
				isIcon={false}
				extraClass="mb-6"
			/>
			<Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
				Восстановить
			</Button>
			<div className="login-action mb-4">
				<p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
				<Link to={AppRoutes.Login}>
					<p className="text text_type_main-default text_color_accent">Войти</p>
				</Link>
			</div>
		</div>
	);
}

export default ForgotPasswordPage;
