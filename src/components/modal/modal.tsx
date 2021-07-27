import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('react-modals');

const Modal = ({ toggleModal, children }) => {
  const handleCloseClick = useCallback(evt => {
    toggleModal(prev => !prev);
  }, [toggleModal]);

  return (
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
  );
};


Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default Modal;
