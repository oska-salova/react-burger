import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';

function ResetPasswordPage() {
	const [codeValue, setCodeValue] = useState('');
	const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCodeValue(e.target.value);
	};

	const [passwordValue, setPasswordValue] = useState('');
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value);
	};

	return (
		<div className="flex-center login-container">
			<p className="text text_type_main-default mb-6">Восстановление пароля</p>
			<PasswordInput
				placeholder="Введите новый пароль"
				onChange={onPasswordChange}
				value={passwordValue}
				name="password"
				extraClass="mb-6"
			/>
			<Input
				type="text"
				placeholder="Введите код из письма"
				onChange={onCodeChange}
				value={codeValue}
				name="name"
				extraClass="mb-6"
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
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

export default ResetPasswordPage;
