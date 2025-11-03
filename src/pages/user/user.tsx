import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { FormEvent } from 'react';
import styles from './user.module.css';
import { updateUser } from '../../services/user';
import { UpdateUserRequest } from '../../model/net/user.interface';
import { useForm } from '../../hooks/useForm';

type UpdateUserForm = Required<UpdateUserRequest>;

function UserPage() {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userReducer);
	const user = userState.user;
	const formDefaultValue = {
		name: user?.name ?? '',
		email: user?.email ?? '',
		password: '',
	} as UpdateUserForm;
	const { formValues, handleChange, setFormValues } = useForm<UpdateUserForm>(formDefaultValue);

	const isUserDataModified =
		formValues.name !== (user?.name ?? '') ||
		formValues.email !== (user?.email ?? '') ||
		!!formValues.password;

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const updateData = { ...formValues } as UpdateUserRequest;
		if (user?.name === formValues.name) {
			delete updateData.name;
		}
		if (user?.email === formValues.email) {
			delete updateData.email;
		}
		if (!formValues.password) {
			delete updateData.password;
		}
		dispatch(updateUser(updateData));
	};

	const handleCancel = () => {
		setFormValues(formDefaultValue);
	};

	const isSubmitAvailable = isUserDataModified && !userState.pending;

	return (
		<section className={`flex-center ${styles.page}`}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					type="text"
					placeholder="Имя"
					onChange={handleChange}
					value={formValues.name}
					name="name"
					extraClass="mb-6"
					icon="EditIcon"
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
				<EmailInput
					onChange={handleChange}
					value={formValues.email}
					name="email"
					isIcon={true}
					extraClass="mb-6"
				/>
				<PasswordInput
					onChange={handleChange}
					value={formValues.password}
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
