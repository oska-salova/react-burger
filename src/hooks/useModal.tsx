import { ReactNode, useState } from 'react';
import Modal from '../components/modal/modal';

export function useModal(
	header?: string,
	children?: ReactNode,
): [typeof isModalOpen, typeof modal, typeof openModal, typeof closeModal] {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		!isModalOpen && setIsModalOpen(true);
	};

	const closeModal = () => {
		isModalOpen && setIsModalOpen(false);
	};

	const modal = (
		<Modal header={header} onClose={closeModal}>
			{children}
		</Modal>
	);

	return [isModalOpen, modal, openModal, closeModal];
}
