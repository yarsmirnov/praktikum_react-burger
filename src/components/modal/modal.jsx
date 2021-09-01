import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';


const modalRoot = document.getElementById('react-modals');


const Modal = ({ children, closeModal }) => {
  const { isOpen } = useSelector(store => store.modal);

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
        {children}
      </section>
    </ModalOverlay>
  ), modalRoot) : null;
};


Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};


export default Modal;
