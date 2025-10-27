import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';

function RegisterPage() {
	const [nameValue, setNameValue] = useState('');
	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value);
	};

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
			<p className="text text_type_main-default mb-6">Регистрация</p>
			<Input
				type="text"
				placeholder="Имя"
				onChange={onNameChange}
				value={nameValue}
				name="name"
				extraClass="mb-6"
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
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
		</div>
	);
}

export default RegisterPage;
