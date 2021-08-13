import React, { useState, useMemo, useCallback } from 'react';

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
  const {items: ingredients} = useSelector(store => store.burgerConstructor);
  const {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    orderData
  } = useSelector(store => store.order);

  const [{canAccept}, dropTarget] = useDrop({
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
    collect: (monitor) => ({
      canAccept: monitor.canDrop(),
    }),
  });

  const [showModal, setShowModal] = useState(false);
  const [hasBun, setHasBun] = useState(false);

  const bun = useMemo(
    () => {
      const target = ingredients.find((item) => item.type === 'bun');

      target ?
        setHasBun(true) :
        setHasBun(false);

      return target;
    }, [ingredients, setHasBun]
  );

  const fillings = useMemo(
    () => ingredients.filter((item) => item.type !== 'bun'),
    [ingredients]
  );

  const orderList = useMemo(
    () => bun ? [bun, ...fillings, bun] : [...fillings],
    [bun, fillings]
  );

  const totalPrice = useMemo(
    () => orderList.reduce((acc, item) => acc + item?.price, 0), [orderList]
  );

  const handleButtonClick = useCallback(async () => {
    const requestData = {
      ingredients: orderList.map(item => item.id),
    }

    dispatch(sendOrderRequest(requestData));
    setShowModal(true);
  }, [dispatch, setShowModal, orderList]);

  const handleRemoveClick = useMemo(() => ({id, uuid}) => () => {
    dispatch(removeItem(uuid));
    dispatch(decreaseIngredientCount(id));
  }, [dispatch]);

  const orderButton = useMemo(() => {
    if (!hasBun) {
      return (
        <Button
          type="primary"
          size="large"
          onClick={() => {}}
        >
          Добавьте булочку
        </Button>
      )
    }
    if (ORDER_REQUEST) {
      return (
        (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
      )
    }

    return (
      <Button
        type="primary"
        size="large"
        onClick={handleButtonClick}
      >
        Оформить заказ
      </Button>
    );
  }, [hasBun, ORDER_REQUEST, handleButtonClick]);


  if (ingredients.length === 0) {
    return (
      <section
        className={`${styles.section} ${canAccept ? styles.canAccept: ''} column pt-25 pr-4`}
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
      className={`${styles.section} ${canAccept ? styles.canAccept: ''} column pt-25 pr-4`}
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

      {fillings.length > 0 &&
      ( <ul
          className={`${styles.ingredientsList} scroller`}
        >
          {ingredients.map((item, index) => {
            if (item.type === 'bun') {
              return null;
            }
            return (
              <DraggableItem
                key={item.uuid}
                id={item.id}
                uuid={item.uuid}
                index={index}
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
      )}

      {bun && (
        <div className='mt-4 pl-8 pr-4'>
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
        className={`${styles.order} mt-10 pr-4`}
      >
        <span
          className={`${styles.orderTotal} text_type_digits-medium mr-10`}
        >
          {totalPrice}
          <i className={`${styles.orderCurrencyIcon} ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </span>

        { orderButton }
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
