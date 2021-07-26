import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById('react-modals');

const Modal = ({ toggleModal, children, title='' }) => {
  const overlayRef = useRef(null);

  const handleCloseClick = useCallback(evt => {
    evt.stopPropagation();
    toggleModal(prev => !prev);
  }, [toggleModal]);

  const handleOverlayClick = (evt) => {
    console.log(overlayRef.current);
    console.log(evt.target);
    console.log(`Is equal: ${overlayRef.current === evt.target}`);

    if (overlayRef.current === evt.target) {
      handleCloseClick(evt);
    }
  }

  const handleEscPress = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        handleCloseClick(evt);
      }
    },
    [handleCloseClick]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [handleEscPress]);

  return modalRoot ? createPortal((
    <div
      className={styles.modalOverlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
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
    </div>
  ),
  modalRoot) : null;
};


Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};


export default Modal;
