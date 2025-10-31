import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './user.module.css';
import { updateUser } from '../../services/user';
import { UpdateUserRequest } from '../../model/net/user.interface';

function UserPage() {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userReducer);
	const user = userState.user;
	const forDefaultValue = {
		name: user?.name ?? '',
		email: user?.email ?? '',
		password: '',
	};

	const [form, setFormValue] = useState(forDefaultValue);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...form, [e.target.name]: e.target.value });
	};

	const isUserDataModified =
		form.name !== (user?.name ?? '') || form.email !== (user?.email ?? '') || !!form.password;

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const updateData = { ...form } as UpdateUserRequest;
		if (user?.name === form.name) {
			delete updateData.name;
		}
		if (user?.email === form.email) {
			delete updateData.email;
		}
		if (!form.password) {
			delete updateData.password;
		}
		dispatch(updateUser(updateData));
	};

	const handleCancel = () => {
		setFormValue(forDefaultValue);
	};

	const isSubmitAvailable = isUserDataModified && !userState.pending;

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
							onClick={handleCancel}
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
