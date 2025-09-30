import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header-item.module.css';
import { ReactElement } from 'react';

type HeaderItemType = 'constructor' | 'order' | 'account' | undefined;

interface HeaderItemProps {
	caption: string;
	type: HeaderItemType;
}

function HeaderItem(props: HeaderItemProps) {
	const iconElement = getIconElement(props.type);

	return (
		<div className={`${styles.item} p-5`}>
			{iconElement}
			<div className={styles.caption}>
				<span className="text text_type_main-default">{props.caption}</span>
			</div>
		</div>
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

export default HeaderItem;
