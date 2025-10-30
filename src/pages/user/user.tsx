import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './user.module.css';

function UserPage() {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userReducer);
	const user = userState.user;

	const [form, setFormValue] = useState({
		name: user?.name ?? '',
		email: user?.email ?? '',
		password: '',
	});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...form, [e.target.name]: e.target.value });
	};

	const isUserDataModified =
		form.name !== (user?.name ?? '') || form.email !== (user?.email ?? '') || !!form.password;

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('** handle submit ', form);
		// dispatch(registerUser(form));
	};

	const isSubmitAvailable = Object.values(form).every(value => !!value) && !userState.pending;

	return (
		<section className={`flex-center ${styles.page}`}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Имя"
					onChange={onChange}
					value={form.name}
					name="name"
					extraClass="mb-6"
					icon="EditIcon"
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
				<EmailInput
					onChange={onChange}
					value={form.email}
					name="email"
					isIcon={true}
					extraClass="mb-6"
				/>
				<PasswordInput
					onChange={onChange}
					value={form.password}
					name="password"
					icon="EditIcon"
					extraClass="mb-6"
				/>
				{userState.error && (
					<p className="text text_type_main-default text_color_error mb-6">
						{userState.error}
					</p>
				)}
				{isUserDataModified && (
					<footer className={styles.footer}>
						<Button
							htmlType="reset"
							type="secondary"
							size="medium"
							disabled={!isSubmitAvailable}
						>
							Отмена
						</Button>
						<Button
							htmlType="submit"
							type="primary"
							size="medium"
							disabled={!isSubmitAvailable}
						>
							Сохранить
						</Button>
					</footer>
				)}
			</form>
		</section>
	);
}

export default UserPage;
