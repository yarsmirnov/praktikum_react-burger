import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { formatDate } from '../../utils/dates';
import { getIngredientsData } from '../../utils/utils';

import Loader from '../loader/loader';
import OrderStatus from '../order-status/order-status';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-info.module.css';


const getOrderDataFromOrders = (orderNumber, ordersList) => {
  return ordersList.find(
    (order) => parseInt(order.number, 10) === parseInt(orderNumber, 10)
  );
};

const generateIngredientElement = ({ img, name, count, price }) => {
  return (
    <li className={`${styles.ingredient} text text_type_main-default`} key={name}>
      <div className={`${styles.ingredientPreview} mr-4`}>
        <img className={`mr-4`} src={img} alt={name} />
      </div>
      <p className={`${styles.ingredientName} mr-4`}>
        { name }
      </p>
      <p className={`${styles.ingredientPrice} text_type_digits-default`}>
        { `${count} x ${price}` }
        <i className={`ml-2`}>
          <CurrencyIcon type="primary" />
        </i>
      </p>
    </li>
  );
};


const OrderInfo = () => {
  const { items: ingredientsDatabase } = useSelector((store) => store.ingredients);
  const { orders } = useSelector((store) => store.websocket);
  const { orderNumber } = useParams();

  const order = useMemo(
    () => getOrderDataFromOrders(orderNumber, orders),
    [orderNumber, orders]
  );

  const ingredientsData = useMemo(
    () => getIngredientsData(order?.ingredients, ingredientsDatabase),
    [order, ingredientsDatabase]
  );

  const totalPrice = useMemo(
    () => ingredientsData.reduce((acc, item) => acc + item.price * item.count, 0),
    [ingredientsData]
  );

  if (!order) {
    return (
      <div className={`${styles.loaderContainer} pt-30`}>
        <Loader />
      </div>
    );
  }

  const { name, number, status, createdAt } = order;
  const orderNumberToShow = `#${String(number).padStart(6,0)}`;
  const dateToShow = formatDate(createdAt);

  return (
    <div className={`${styles.pageContainer} text text_type_main-default pt-15 pb-10`}>
      <h1 className={`visualliHidden`}>
        Информация о заказе
      </h1>

      <h2 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
        { orderNumberToShow }
      </h2>

      <p className={`${styles.orderName} text text_type_main-medium mb-3`}>
        { name }
      </p>

      <p className={`${styles.orderStatus} mb-15`}>
        <OrderStatus status={status} />
      </p>

      <h3 className={`${styles.orderComposition} text text_type_main-medium mb-6`}>
        Состав:
      </h3>

      <ul className={`${styles.ingredientsList} scroller pr-6 mb-10`}>
        { ingredientsData.map(
          (data) => generateIngredientElement(data)
        ) }
      </ul>

      <div className={`${styles.orderColumns}`}>
        <p className={`${styles.orderDate} text_type_main-default text_color_inactive`}>
          { dateToShow }
        </p>

        <p className={`${styles.orderTotalPrice} text_type_digits-default`}>
          { totalPrice }
          <i className={`ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </p>
      </div>
    </div>
  );
};


export default OrderInfo;
