import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { openModalAction } from '../../services/actions/modal';
import {
  wsConnectionStart,
  wsConnectionClosed
} from '../../services/actions/websocket';
import { wsUserOrdersApi } from '../../services/api';
import { getCookie } from '../../utils/cookie';

import Loader from '../loader/loader';
import OrderCard from './order-card';
import OrderInfo from '../order-info/order-info';

import styles from './user-orders.module.css';


const UserOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { items: ingredientsDatabase } = useSelector((store) => store.ingredients);
  const { wsConnected, error, orders } = useSelector((store) => store.websocket);

  const sortedOrders = useMemo(
    () => orders.length
      ? [...orders].reverse()
      : [],
    [orders]
  );

  useEffect(() => {
    const wsUrl = `${wsUserOrdersApi}${getCookie('accessToken')}`;
    dispatch(wsConnectionStart(wsUrl));
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch]);

  if ((!wsConnected && !error)
    || !ingredientsDatabase.length) {
    return (
      <div className={`${styles.loaderContainer} pt-30`}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`pt-20`}>
        <p className={`text text_type_main-large text-with-glow mb-4`}>
          Произошла ошибка :(
        </p>
        <p className={`text text_type_main-medium`}>
          Не получилось загрузить данные с сервера
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className={`pt-20`}>
        <p className={`text text_type_main-large text-with-glow mb-4`}>
          Здесь пусто :(
        </p>
        <p className={`text text_type_main-medium`}>
          {`Вы можете оформить свой первый заказ `}
          <Link
            to='/'
            className={`${styles.link}`}
          >
            на главной.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <ul className={`${styles.list} scroller`}>
      { sortedOrders.map(
        (order) => (
          <li className={`mb-6`} key={order.number}>
            <Link
              className={`${styles.list_link}`}
              to={{
                pathname: `${url}/${order.number}`,
                state: { background: location}
              }}
              onClick={() => {
                dispatch(openModalAction(OrderInfo));
              }}
            >
              <OrderCard
                orderInfo={order}
                ingredientsList={ingredientsDatabase}
              />
            </Link>
          </li>
        )
      ) }
    </ul>
  );
};


export default UserOrders;
