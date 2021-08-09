import React, { useState, useMemo } from 'react';

import { useSelector } from 'react-redux';

import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const orderPostApi = 'https://norma.nomoreparties.space/api/orders';
const orderInitialState = {
  name: '',
  id: 0,
};
const orderRequestStatus = {
  PENDING: 'PENDING',
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};


const BurgerConstructor = () => {
  const {value: ingredients} = useSelector(state => state.burgerConstructor);

  const [showModal, setShowModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState(orderRequestStatus.PENDING);
  const [orderState, setOrderState] = useState(orderInitialState);

  const bun = useMemo(
    () => ingredients.find((item) => item.type === 'bun'),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter((item) => item.type !== 'bun'), [ingredients]
  );

  const orderList = useMemo(
    () => [bun, ...fillings, bun],
    [bun, fillings]
  );

  const totalPrice = useMemo(
    () => orderList.reduce((acc, item) => acc + item?.price, 0), [orderList]
  );

  const handleButtonClick = async () => {
    setRequestStatus(orderRequestStatus.REQUEST);
    setOrderState(orderInitialState);

    const requestData = {
      ingredients: orderList.map(item => item.id),
    }

    fetch(orderPostApi, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestData),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Bad BurgerConstructor request');
    })
    .then(data => {
      if (data.success) {
        setRequestStatus(orderRequestStatus.SUCCESS);
        setOrderState({name: data.name, id: data.order.number,sending: false});
        setShowModal(true);
      } else {
        throw new Error('BurgerConstructor got unsuccessful response');
      }
    })
    .catch(err => {
      setRequestStatus(orderRequestStatus.FAILURE);
      console.log('BurgerConstructor request error:', err);
    });
  };

  if (ingredients.length === 0) {
    return (
      <section className={`${styles.section} column pt-25 pr-4`}>
        <h2 className='visualliHidden'>
          Ваша сборка
        </h2>
      </section>
    );
  }


  return (
    <section className={`${styles.section} column pt-25 pr-4`}>
      <h2 className='visualliHidden'>
        Ваша сборка
      </h2>

    {bun && (
      <div className='mb-4 pl-8 pr-4'>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )
    }

      <ul
        className={`${styles.ingredientsList} scroller`}
      >
        {ingredients.map(item => {
          if (item.type === 'bun') {
            return null;
          }
          return (
            <li
              key={item.id}
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

      {bun && (
        <div className='mt-4 mb-10 pl-8 pr-4'>
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

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

        { requestStatus !== orderRequestStatus.REQUEST ?
          (
            <Button
              type="primary"
              size="large"
              onClick={handleButtonClick}
            >
              Оформить заказ
            </Button>
          ) :
          (
            <Button
              type="primary"
              size="large"
              onClick={() => {}}
            >
              Обрабатываем заказ
            </Button>
          )
        }
      </div>


      { showModal &&
        orderState.id &&
        (
          <Modal toggleModal={setShowModal}>
            <OrderDetails orderId={orderState.id} />
          </Modal>
      )}
    </section>
  );
};


export default BurgerConstructor;
