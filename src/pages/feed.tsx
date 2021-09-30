import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  wsConnectionStart,
  wsConnectionClosed
} from '../services/actions/websocket';
import { wsAllOrdersApi } from '../services/api';

import OrdersFeed from '../components/orders-feed/orders-feed';
import OrdersSummary from '../components/orders-summary/orders-summary';
import Loader from '../components/loader/loader';

import layoutStyles from './page-layout.module.css';


export const FeedPage = () => {
  const dispatch = useDispatch();
  const { items: ingredients } = useSelector((store) => store.ingredients);
  const { orders, total, totalToday } = useSelector((store) => store.websocket);

  useEffect(() => {
    dispatch(wsConnectionStart(wsAllOrdersApi));
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch]);

  if (!ingredients.length || !orders.length) {
    return (
      <section className={`pt-30`}>
        <h1 className={`text text_type_main-large mb-30`}>
          Лента заказов
        </h1>
        <div className={`${layoutStyles.loaderContainer}`}>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-10`}>
      <h1 className={`text text_type_main-large mb-4`}>
        Лента заказов
      </h1>

      <div className={`columnsContainer`}>
        <section className={`column mr-10`}>
          <h2 className={`visualliHidden`}>
            Последние заказы
          </h2>
          <OrdersFeed orders={orders} ingredientsList={ingredients} />
        </section>

        <section className={`column`}>
          <h2 className={`visualliHidden`}>
            Сводная информация
          </h2>
          <OrdersSummary
            orders={orders}
            total={total}
            totalToday={totalToday}
          />
        </section>
      </div>
    </section>
  );
};
