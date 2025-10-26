import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header-item.module.css';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../pages/config';

type HeaderItemType = 'constructor' | 'order' | 'account' | undefined;

interface HeaderItemProps {
	caption: string;
	type: HeaderItemType;
}

function HeaderItem(props: HeaderItemProps) {
	const iconElement = getIconElement(props.type);
	const routePath = getLinkPath(props.type);

	return (
		<Link to={routePath} className={`${styles.item} p-5`}>
			{iconElement}
			<div className={styles.caption}>
				<span className="text text_type_main-default">{props.caption}</span>
			</div>
		</Link>
	);
}

function getIconElement(type: HeaderItemType): ReactElement | undefined {
	switch (type) {
		case 'constructor':
			return <BurgerIcon type="primary" />;
		case 'order':
			return <ListIcon type="primary" />;
		case 'account':
			return <ProfileIcon type="primary" />;
	}
	return <></>;
}

function getLinkPath(type: HeaderItemType): string {
	switch (type) {
		case 'constructor':
			return AppRoutes.Home;
		case 'order':
			return AppRoutes.OrderFeed;
		case 'account':
			return AppRoutes.Profile;
		default:
			return AppRoutes.Home;
	}
}

export default HeaderItem;
