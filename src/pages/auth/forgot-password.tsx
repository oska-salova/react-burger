import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../config';
import { resetPassword, ResetPasswordRequest } from '../../net/api';
import { password } from '../../model/password';
import { useForm } from '../../hooks/useForm';

function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { formValues, handleChange } = useForm<ResetPasswordRequest>({ email: '' });

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		resetPassword(formValues, 'reset')
			.then((success: boolean) => {
				if (success) {
					password.enableReset();
					navigate(AppRoutes.ResetPassword);
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
			<EmailInput
				placeholder="Укажите e-mail"
				onChange={handleChange}
				value={formValues.email}
				name="email"
				isIcon={false}
				extraClass="mb-6"
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

export default ForgotPasswordPage;
