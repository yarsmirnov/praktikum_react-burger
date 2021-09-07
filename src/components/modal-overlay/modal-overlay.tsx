import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';


const ModalOverlay = ({ closeModal, children }) => {
  const overlayRef = useRef(null);

  const handleClick = useCallback((evt) => {
    if (evt.target === overlayRef.current) {
      closeModal();
    }
  }, [closeModal]);

  const handleEscPress = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    },
    [closeModal]
  );

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
      { children }
    </div>
  );
};


ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};


export default ModalOverlay;
