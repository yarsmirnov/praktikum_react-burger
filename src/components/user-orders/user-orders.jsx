import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { openModal } from '../../services/slices/modal';
import { CONNECTION_START, CONNECTION_CLOSED } from '../../services/slices/websocket';
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
  const { orders } = useSelector((store) => store.websocket);

  useEffect(() => {
    const wsUrl = `${wsUserOrdersApi}${getCookie('accessToken')}`;
    dispatch(CONNECTION_START(wsUrl));
    return () => {
      dispatch(CONNECTION_CLOSED());
    }
  }, [dispatch]);

  if (!ingredientsDatabase
    || !ingredientsDatabase.length) {
    return (
      <div className={`${styles.loaderContainer} pt-30`}>
        <Loader />
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
      { orders.map(
        (order) => (
          <li className={`mb-6`} key={order.number}>
            <Link
              className={`${styles.list_link}`}
              to={{
                pathname: `${url}/${order.number}`,
                state: { background: location}
              }}
              onClick={() => {
                dispatch(openModal(OrderInfo));
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
