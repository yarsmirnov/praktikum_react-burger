import React, { useEffect, useRef, useCallback, FC } from 'react';

import styles from './modal-overlay.module.css';


type TModalOverlayProps = {
  closeModal: Function;
  children: JSX.Element;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback ((evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target === overlayRef.current) {
      closeModal();
    }
  }, [closeModal]);

  const handleEscPress = useCallback(
    (evt: KeyboardEvent) => {
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


export default ModalOverlay;
