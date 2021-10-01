import React, { useMemo, useState, useEffect, FC } from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';

import { getIngredientsData } from '../utils/utils';
import { formatDate } from '../utils/dates';
import { getOrderRequest } from '../services/api';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';
import OrderStatus from '../components/order-status/order-status';

import {
  TCardIngredient,
  TWsOrderRecieved,
  TOrdersTapeResponse
} from '../services/types/data';

import layoutStyles from './page-layout.module.css';
import styles from './order.module.css';


const generateIngredientElement = ({
  img,
  name,
  count,
  price
}: TCardIngredient): JSX.Element => {
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


export const OrderPage: FC<{}> = () => {
  const { items: ingredientsDatabase } = useSelector((store) => store.ingredients);
  const { orderNumber } = useParams() as { [key: string]: string };
  const [ order, setOrder ] = useState<TWsOrderRecieved|null>(null);
  const [ requestStatus, setRequesStatus ] = useState({
    PENDING: false,
    SUCCESS: false,
    ERROR: false
  });

  useEffect(() => {
    setRequesStatus({PENDING: true, SUCCESS: false, ERROR: true});

    getOrderRequest(orderNumber)
      .then(res => {
        if (!res.ok) {
          setRequesStatus({PENDING: false, SUCCESS: false, ERROR: true});
        }
        return res.json();
      })
      .then((data: TOrdersTapeResponse) => {
        setOrder(data.orders[0]);
        setRequesStatus({PENDING: false, SUCCESS: true, ERROR: false})
      })
      .catch(err => {
        setRequesStatus({PENDING: false, SUCCESS: false, ERROR: true});
        console.error(err);
      })
  }, [orderNumber]);

  const ingredientsData = useMemo(
    () => {
      if (order && ingredientsDatabase.length) {
        return getIngredientsData(order?.ingredients, ingredientsDatabase);
      }
      return [];
    },
    [order, ingredientsDatabase]
  );
  const totalPrice = useMemo(
    () => ingredientsData.reduce((acc, item) => acc + item.price, 0),
    [ingredientsData]
  );

  if (requestStatus.PENDING || !ingredientsDatabase || !ingredientsDatabase.length) {
    return (
      <div className={`${layoutStyles.loaderContainer} pt-30`}>
        <Loader />
      </div>
    );
  }

  if (requestStatus.ERROR) {
    <div className={`${layoutStyles.loaderContainer} pt-30`}>
      <h1 className={`text text_type_main-large text-with-glow mb-20`}>
        Что-то пошло не так :(
      </h1>
      <p className={`text text_type_main-medium mb-4`}>
        Не получилось получить данные о заказе
      </p>
    </div>
  }

  if (order && !order.number) {
    <div className={`${layoutStyles.loaderContainer} pt-30`}>
      <h1 className={`text text_type_main-large text-with-glow mb-20`}>
        Что-то пошло не так :(
      </h1>
      <p className={`text text_type_main-medium mb-4`}>
        Не получилось получить данные о заказе
      </p>
      <p className={`text text_type_main-medium`}>
        Возможно указан некорректный номер заказа
      </p>
    </div>
  }

  if (order) {
  const { name, number, status, createdAt } = order;
  const orderNumberToShow = `#${String(number).padStart(6,'0')}`;
  const dateToShow = formatDate(createdAt);

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
    </section>
  )
  } else {
    return null;
  }
};
