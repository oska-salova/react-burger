import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../config';
import { resetPassword, RestorePasswordRequest } from '../../net/api';
import { password } from '../../model/password';
import { useForm } from '../../hooks/useForm';

function ResetPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!password.isResetAvailable()) {
			navigate(AppRoutes.ForgotPassword, { replace: true });
		}
	}, []);

	const { formValues, handleChange } = useForm<RestorePasswordRequest>({
		password: '',
		token: '',
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		resetPassword(formValues, 'restore')
			.then((success: boolean) => {
				if (success) {
					password.disableReset();
					navigate(AppRoutes.Login);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const isSubmitAvailable = Object.values(formValues).every(value => !!value) && !isLoading;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Восстановление пароля</p>
			<PasswordInput
				placeholder="Введите новый пароль"
				onChange={handleChange}
				value={formValues.password}
				name="password"
				extraClass="mb-6"
			/>
			<Input
				type="text"
				placeholder="Введите код из письма"
				onChange={handleChange}
				value={formValues.token}
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
