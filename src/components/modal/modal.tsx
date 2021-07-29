import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';


const modalRoot = document.getElementById('react-modals');


const Modal = ({ toggleModal, children }) => {
  const handleCloseClick = useCallback(() => {
    toggleModal(prev => !prev);
  }, [toggleModal]);

  return modalRoot ? createPortal((
    <ModalOverlay toggleModal={toggleModal}>
      <section className={`${styles.modal} text pl-10 pr-10`}>
        <button
          className={styles.closeButton}
          aria-label="Закрыть модальное окно"
          onClick={handleCloseClick}
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
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default Modal;
