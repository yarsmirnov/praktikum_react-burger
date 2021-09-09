import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { order } from '../../utils/mock-orders';
import { getIngredientsData } from '../../utils/utils';

import Loader from '../loader/loader';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-info.module.css';


const generateStatusElement = (status) => {
  switch (status) {
    case 'done': {
      return (
        <span className={`${styles.statusDone}`}>
          Выполнен
        </span>
      );
    }
    case 'cooking': {
      return (
        <span className={`${styles.statusInWork}`}>
          Готовится
        </span>
      )
    }
    case 'canseled': {
      return (
        <span className={`${styles.statusCanseled}`}>
          Готовится
        </span>
      );
    }
    default:
      return null;
  }
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
      <div className={`${styles.loaderContainer} pt-30`}>
        <Loader />
      </div>
    );
  }

  const { name, number, status, createdAt } = order;
  const orderNumberToShow = `#${String(number).padStart(6,0)}`;

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
        { generateStatusElement(status) }
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
    </div>
  );
};


export default OrderInfo;
