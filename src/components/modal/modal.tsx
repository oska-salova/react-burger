import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';

const modalRoot = document.getElementById('modals') as HTMLElement;
const closeKeys = ['Escape'];

interface ModalPropsType {
	children: ReactNode;
	header?: string;
	onClose?: () => void;
}

const Modal: FC<ModalPropsType> = ({ children, header, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (closeKeys.includes(event.key)) {
				onClose && onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return createPortal(
		<>
			<div className={styles.modal}>
				<ModalHeader header={header} onClose={onClose} />
				<div className={styles.body}>{children}</div>
			</div>
			<ModalOverlay />,
		</>,
		modalRoot,
	);
};

export default Modal;
