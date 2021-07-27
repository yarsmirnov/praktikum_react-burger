import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

import Modal from '../modal/modal';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ toggleModal, children }) => {
  const overlayElement = useRef(null);

  const handleClick = useCallback((evt) => {
    if (evt.target === overlayElement.current) {
      toggleModal(prev => !prev);
    }
  }, [toggleModal]);

  const handleEscPress = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        toggleModal(prev => !prev);
      }
    },
    [toggleModal]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [handleEscPress]);

  return modalRoot ? createPortal((
    <div
      className={styles.overlay}
      ref={overlayElement}
      onClick={handleClick}
    >
      <Modal toggleModal={toggleModal}>
        {children}
      </Modal>
    </div>
  ), modalRoot) : null;
};


Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default ModalOverlay;
