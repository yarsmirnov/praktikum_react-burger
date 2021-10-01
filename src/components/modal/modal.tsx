import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from '../../services/hooks';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';


type TModalProps = {
  closeModal: React.MouseEventHandler;
}


const modalRoot = document.getElementById('react-modals');


const Modal: FC<TModalProps> = ({ closeModal }) => {
  const { isOpen, ComponentToView } = useSelector((store) => store.modal);

  if (!isOpen) return null;

  return modalRoot ? createPortal((
    <ModalOverlay closeModal={closeModal}>
      <section className={`${styles.modal} text pl-10 pr-10`}>
        <button
          className={styles.closeButton}
          aria-label="Закрыть модальное окно"
          onClick={closeModal}
        >
          <i>
            <CloseIcon type="primary" />
          </i>
        </button>
        { ComponentToView && <ComponentToView /> }
      </section>
    </ModalOverlay>
  ), modalRoot) : null;
};


export default Modal;
