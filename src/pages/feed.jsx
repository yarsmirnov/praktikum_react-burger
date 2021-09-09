import React from 'react';
import { useSelector } from 'react-redux';

import { requestSuccess } from '../utils/mock-orders';

import OrdersFeed from '../components/orders-feed/orders-feed';
import OrdersSummary from '../components/orders-summary/orders-summary';
import Loader from '../components/loader/loader';

import layoutStyles from './page-layout.module.css';


export const FeedPage = () => {
  const { items: ingredients } = useSelector((store) => store.ingredients);
  const { orders, total, totalToday } = requestSuccess;

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
