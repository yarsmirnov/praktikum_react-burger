import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';



const modalRoot = document.getElementById('react-modals');

const BurgerConstructor = ({ ingredients }) => {
  const [showModal, setShowModal] = useState(false);

  if (ingredients.length === 0) {
    return (
      <section className={`${styles.section} column pt-25 pr-4`}>
        <h2 className='visualliHidden'>
          Ваша сборка
        </h2>
      </section>
    );
  }

  const bun = ingredients.find(item => item.type === 'bun');
  const fillings = ingredients.filter(item => item.type !== 'bun');
  const totalPrice = ingredients.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleButtonClick = () => {
    console.log('Oh, no. I was clicked!');
    setShowModal(prev => !prev);
  }

  return (
    <section className={`${styles.section} column pt-25 pr-4`}>
      <h2 className='visualliHidden'>
        Ваша сборка
      </h2>

      <div className='mb-4 pl-8 pr-4'>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <ul
        className={`${styles.ingredientsList} scroller`}
      >
        {fillings.map(item => {
          if (item.type === 'bun') {
            return null;
          }
          return (
            <li
              key={item._id}
              className={styles.listItem}
            >
              <i
                className={`${styles.itemIcon} mr-2`}
              >
                <DragIcon type="primary" />
              </i>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>

      <div className='mt-4 mb-10 pl-8 pr-4'>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div
        className={`${styles.order} pr-4`}
      >
        <span
          className={`${styles.orderTotal} text_type_digits-medium mr-10`}
        >
          {totalPrice}
          <i className={`${styles.orderCurrencyIcon} ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </span>

        <Button
          type="primary"
          size="large"
          onClick={handleButtonClick}
        >
          Оформить заказ
        </Button>
      </div>

      {showModal && (
        modalRoot ?
          createPortal((
            <Modal toggleModal={setShowModal}>
              <OrderDetails />
            </Modal>
          ), modalRoot) : null
      )}
    </section>
  );
};


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
};


export default BurgerConstructor;
