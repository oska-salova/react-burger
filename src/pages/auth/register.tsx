import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../config';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerUser } from '../../services/user';
import { useForm } from '../../hooks/useForm';
import { RegisterUserRequest } from '../../model/net/user.interface';

function RegisterPage() {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userReducer);
	const { formValues, handleChange } = useForm<RegisterUserRequest>({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(registerUser(formValues));
	};

	const isSubmitAvailable =
		Object.values(formValues).every(value => !!value) && !userState.pending;

	return (
		<form className="flex-center login-container" onSubmit={handleSubmit}>
			<p className="text text_type_main-default mb-6">Регистрация</p>
			<Input
				type="text"
				placeholder="Имя"
				onChange={handleChange}
				value={formValues.name}
				name="name"
				extraClass="mb-6"
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
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
				Зарегистрироваться
			</Button>
			{userState.error && (
				<p className="text text_type_main-default text_color_error">{userState.error}</p>
			)}
			<div className="login-action mb-4">
				<p className="text text_type_main-default text_color_inactive">
					Уже зарегистрированы?
				</p>
				<Link to={AppRoutes.Login}>
					<p className="text text_type_main-default text_color_accent">Войти</p>
				</Link>
			</div>
		</form>
	);
}

export default RegisterPage;
