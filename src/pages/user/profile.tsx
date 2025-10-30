import { NavLink, Outlet, useHref, useLocation } from 'react-router-dom';
import { ProfileRoutes } from '../config';
import styles from './profile.module.css';

function ProfilePage() {
	const location = useLocation();
	const userHref = useHref(ProfileRoutes.User, { relative: 'path' });

	const description =
		location.pathname === userHref
			? 'В этом разделе вы можете изменить свои персональные данные'
			: 'В этом разделе вы можете просмотреть свою историю заказов';
	return (
		<section className={styles.page}>
			<nav className={styles.menu}>
				<NavLink
					to={ProfileRoutes.User}
					end
					className={({ isActive }) =>
						[isActive ? 'active' : '', styles.menuItem].join(' ')
					}
				>
					<p className="text text_type_main-default">Профиль</p>
				</NavLink>
				<NavLink to={ProfileRoutes.Orders} className={styles.menuItem}>
					<p className="text text_type_main-default">История заказов</p>
				</NavLink>
				<p className={`text text_type_main-default text_color_inactive ${styles.menuItem}`}>
					Выход
				</p>
				<p
					className={`text text_type_main-default text_color_inactive mt-20 ${styles.description}`}
				>
					{description}
				</p>
			</nav>

			<section className={styles.content}>
				<Outlet />
			</section>
		</section>
	);
}

export default ProfilePage;
