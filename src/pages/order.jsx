import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { order } from '../utils/mock-orders';
import { getIngredientsData } from '../utils/utils';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';
import OrderStatus from '../components/order-status/order-status';

import layoutStyles from './page-layout.module.css';
import styles from './order.module.css';


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


export const OrderPage = () => {
  const { items: ingredientsDatabase } = useSelector((store) => store.ingredients);
  const ingredientsData = useMemo(
    () => getIngredientsData(order?.ingredients, ingredientsDatabase),
    [ingredientsDatabase]
  );
  const totalPrice = useMemo(
    () => ingredientsData.reduce((acc, item) => acc + item.price, 0),
    [ingredientsData]
  );

  if (!order || !ingredientsDatabase || !ingredientsDatabase.length) {
    return (
      <div className={`${layoutStyles.loaderContainer} pt-30`}>
        <Loader />
      </div>
    );
  }

  const { name, number, status, createdAt } = order;
  const orderNumberToShow = `#${String(number).padStart(6,0)}`;

  return (
    <section className={`${styles.pageContainer} text text_type_main-default pt-30`}>
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
        <p className={`${styles.orderDate} text_type_digits-default text_color_inactive`}>
          { createdAt }
        </p>

        <p className={`${styles.orderTotalPrice} text_type_digits-default`}>
          { totalPrice }
          <i className={`ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </p>
      </div>
    </section>
  );
};
