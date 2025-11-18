import { ReactNode, useState } from 'react';
import Modal from '../components/modal/modal';

export function useModal(
	header?: string,
	children?: ReactNode,
): [typeof isModalOpen, typeof modal, typeof openModal, typeof closeModal] {
	const [modalContent, setModalContent] = useState<ReactNode>(children ?? null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (children?: ReactNode) => {
		if (children) {
			setModalContent(children);
		}
		!isModalOpen && setIsModalOpen(true);
	};

	const closeModal = () => {
		isModalOpen && setIsModalOpen(false);
	};

	const modal = (
		<Modal header={header} onClose={closeModal}>
			{modalContent}
		</Modal>
	);

	return [isModalOpen, modal, openModal, closeModal];
}
