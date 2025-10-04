import { FC } from 'react';
import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalHeaderPropsType {
	header?: string;
	onClose?: () => void;
}

const ModalHeader: FC<ModalHeaderPropsType> = ({ header, onClose }) => {
	return (
		<div className={styles.header}>
			<p className={`${styles.caption} text text_type_main-large`}>{header}</p>
			<button className={styles.close}>
				<CloseIcon type="primary" onClick={onClose} />
			</button>
		</div>
	);
};

export default ModalHeader;
