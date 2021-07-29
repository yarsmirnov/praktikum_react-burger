import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

import Modal from '../modal/modal';


const ModalOverlay = ({ toggleModal, children }) => {
  const overlayRef = useRef(null);

  const handleClick = useCallback((evt) => {
    if (evt.target === overlayRef.current) {
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

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};


Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default ModalOverlay;
