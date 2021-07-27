import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('react-modals');

const Modal = ({ toggleModal, children, title='' }) => {
  const handleCloseClick = useCallback(evt => {
    toggleModal(prev => !prev);
  }, [toggleModal]);

  return (
    <section className={`${styles.modal} text pb-15 pl-10 pr-10 ${title ? 'pt-10' : 'pt-30'}`}>
      {title !== '' ?
        <h2
          className={`${styles.title} text_type_main-large mt-3 mb-3`}
        >
            {title}
          </h2> :
        null}

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
  title: PropTypes.string,
};


export default Modal;
