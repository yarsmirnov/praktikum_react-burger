import React, { useState, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setBun } from '../../services/slices/burger-constructor';
import { increaseIngredientCount, decreaseIngredientCount } from '../../services/slices/ingredients';
import { useDrop } from 'react-dnd';

import { sendOrderRequest } from '../../services/slices/order';

import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableItem from './draggable-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {value: ingredients} = useSelector(store => store.burgerConstructor);
  const {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    orderData
  } = useSelector(store => store.order);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      item.type === 'bun' ?
        dispatch(setBun(item)) :
        dispatch(addItem(item));

      dispatch(increaseIngredientCount({
        id: item.id,
        type: item.type,
      }));
    },
  });

  const [showModal, setShowModal] = useState(false);

  const bun = useMemo(
    () => ingredients.find((item) => item.type === 'bun'),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter((item) => item.type !== 'bun'), [ingredients]
  );


  const orderList = useMemo(
    () => bun ? [bun, ...fillings, bun] : [...fillings],
    [bun, fillings]
  );

  const totalPrice = useMemo(
    () => orderList.reduce((acc, item) => acc + item?.price, 0), [orderList]
  );

  const handleButtonClick = async () => {
    const requestData = {
      ingredients: orderList.map(item => item.id),
    }

    dispatch(sendOrderRequest(requestData));
    setShowModal(true);
  };

  const handleRemoveClick = ({id, uuid}) => () => {
    dispatch(removeItem(uuid));
    dispatch(decreaseIngredientCount(id));
  };

  if (ingredients.length === 0) {
    return (
      <section
        className={`${styles.section} column pt-25 pr-4`}
        ref={dropTarget}
      >
        <h2 className='visualliHidden'>
          Ваша сборка
        </h2>
      </section>
    );
  }


  return (
    <section
      className={`${styles.section} column pt-25 pr-4`}
      ref={dropTarget}
    >
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
            <DraggableItem
              key={item.uuid}
              id={item.id}
              uuid={item.uuid}
              name={item.name}
              price={item.price}
              image={item.image}
              handleClose={handleRemoveClick(
                {uuid: item.uuid, id: item.id}
              )}
            />
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

        { ORDER_REQUEST ?
          (
            <Button
              type="primary"
              size="large"
              onClick={() => {}}
            >
              Обрабатываем заказ
            </Button>
          ) :
          (
            <Button
              type="primary"
              size="large"
              onClick={handleButtonClick}
            >
              Оформить заказ
            </Button>
          )
        }
      </div>


      { showModal &&
        ORDER_SUCCESS &&
        (
          <Modal toggleModal={setShowModal}>
            <OrderDetails orderId={orderData.order.number} />
          </Modal>
      )}
    </section>
  );
};


export default BurgerConstructor;
