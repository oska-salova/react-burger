import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderItem from './header-item/header-item';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../pages/config';

function AppHeader() {
	return (
		<header className={styles.header}>
			<nav className={styles.content}>
				<div className={styles.block}>
					<HeaderItem type="constructor" caption="Конструктор" />
					<HeaderItem type="order" caption="Лента заказов" />
				</div>
				<Link to={AppRoutes.Home}>
					<Logo />
				</Link>
				<HeaderItem type="account" caption="Личный кабинет" />
			</nav>
		</header>
	);
}

export default AppHeader;
