import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/slices/modal';
import { useHistory } from 'react-router-dom';

import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';


const modalRoot = document.getElementById('react-modals');


const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen } = useSelector(store => store.modal);

  const handleCloseClick = useCallback(() => {
    dispatch(closeModal());
    history.goBack();
  }, [dispatch, history]);

  if (!isOpen) return null;

  return modalRoot ? createPortal((
    <ModalOverlay toggleModal={handleCloseClick}>
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
  children: PropTypes.element.isRequired,
};


export default Modal;
