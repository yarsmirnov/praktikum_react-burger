import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setBun } from '../../services/slices/burger-constructor';
import { increaseIngredientCount, decreaseIngredientCount } from '../../services/slices/ingredients';
import { openModal } from '../../services/slices/modal';
import { useDrop } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import { resetRequestStatus, sendOrderRequest } from '../../services/slices/order';

import styles from './burger-constructor.module.css';

import {
  ConstructorElement,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableItem from './draggable-item';
import OrderDetails from '../order-details/order-details';
import Loader from '../loader/loader';


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {items: ingredients} = useSelector(store => store.burgerConstructor);
  const {
    ORDER_REQUEST,
    ORDER_SUCCESS,
  } = useSelector(store => store.order);
  const { user } = useSelector(store => store.user);
  const { isOpen } = useSelector(store => store.modal);

  useEffect(() => {
    if (ORDER_SUCCESS) {
      history.push(`/order`, { background: location });
      dispatch(openModal(OrderDetails));
      dispatch(resetRequestStatus());
    }
  }, [history, location, dispatch, isOpen, ORDER_SUCCESS]);

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
    if (!user) {
      history.replace({
        pathname: '/login',
      })
    }
    else {
      const requestData = {
        ingredients: orderList.map(item => item.id),
      };
      dispatch(sendOrderRequest(requestData));
    }
  }, [user, history, dispatch, orderList]);

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

    if (!fillings.length) {
      return (
        <Button
          type="primary"
          size="large"
          onClick={() => {}}
        >
          Добавьте ингредиенты
        </Button>
      )
    }

    if (ORDER_REQUEST) {
      return ( <Loader /> )
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
  }, [fillings, hasBun, ORDER_REQUEST, handleButtonClick]);


  if (ingredients.length === 0) {
    return (
      <section
        className={`${styles.section} column pt-25 pr-4`}
        ref={dropTarget}
      >
        <h2 className='visualliHidden'>
          Ваша сборка
        </h2>
        <div className={`${styles.emptyConstructor} ${styles.emptyConstructor_maxHeight} ${canAccept ? styles.canAccept: ''}`}>
          <p className={`text text_type_main-medium`}>
            Перетащите ингредиенты сюда
          </p>
        </div>
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

    { bun && (
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

    { !fillings.length && (
      <ul
        className={`${styles.ingredientsList} ${styles.emptyConstructor}`}
      >
        <li>
          <p className={`text text_type_main-medium`}>
            Добавьте ингредиенты
          </p>
        </li>
      </ul>
      )
    }

    { fillings.length > 0 &&
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
    </section>
  );
};


export default BurgerConstructor;
