import { NavLink, Outlet } from 'react-router-dom';
import { ProfileRoutes } from '../config';

function ProfilePage() {
	return (
		<section className="flex-center">
			<nav>
				<NavLink
					to={ProfileRoutes.User}
					end
					className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
				>
					<p className="text text_type_main-default">Профиль</p>
				</NavLink>
				<NavLink to={ProfileRoutes.Orders}>
					<p className="text text_type_main-default">История заказов</p>
				</NavLink>
				<p className="text text_type_main-default text_color_inactive">Выход</p>
			</nav>
			<Outlet />
		</section>
	);
}

export default ProfilePage;
