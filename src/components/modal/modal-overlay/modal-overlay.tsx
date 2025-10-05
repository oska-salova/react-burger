import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayPropsType {
	onClick: () => void;
}

const ModalOverlay: FC<ModalOverlayPropsType> = ({ onClick }) => {
	return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
