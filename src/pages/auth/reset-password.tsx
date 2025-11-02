import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../config';
import { resetPassword } from '../../net/api';
import { localStorageUtils } from '../../model/local-storage';

function ResetPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!localStorageUtils.getResetPassword()) {
			navigate(AppRoutes.ForgotPassword, { replace: true });
		}
	}, []);

	const [form, setFormValue] = useState({ password: '', token: '' });
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		resetPassword(form, 'restore')
			.then((success: boolean) => {
				if (success) {
					localStorageUtils.removeResetPassword();
					navigate(AppRoutes.Login);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const isSubmitAvailable = Object.values(form).every(value => !!value) && !isLoading;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Восстановление пароля</p>
			<PasswordInput
				placeholder="Введите новый пароль"
				onChange={onChange}
				value={form.password}
				name="password"
				extraClass="mb-6"
			/>
			<Input
				type="text"
				placeholder="Введите код из письма"
				onChange={onChange}
				value={form.token}
				name="token"
				extraClass="mb-6"
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
			<Button
				htmlType="submit"
				type="primary"
				size="medium"
				extraClass="mb-20"
				disabled={!isSubmitAvailable}
			>
				Восстановить
			</Button>
			<div className="login-action mb-4">
				<p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
				<Link to={AppRoutes.Login}>
					<p className="text text_type_main-default text_color_accent">Войти</p>
				</Link>
			</div>
		</form>
	);
}

export default ResetPasswordPage;
