import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayPropsType {
	onClick: () => void;
}

const ModalOverlay: FC<ModalOverlayPropsType> = ({ onClick }) => {
	return <div className={styles.overlay} onClick={onClick} data-testid="modal-overlay"></div>;
};

export default ModalOverlay;
