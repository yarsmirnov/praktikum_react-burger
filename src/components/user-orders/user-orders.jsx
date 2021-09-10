import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { requestSuccess } from  '../../utils/mock-orders';
import { openModal } from '../../services/slices/modal';

import Loader from '../loader/loader';
import OrderCard from './order-card';
import OrderInfo from '../order-info/order-info';

import styles from './user-orders.module.css';


const UserOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { items: ingredientsDatabase } = useSelector((store) => store.ingredients);
  const { orders } = requestSuccess;

  if (!orders
    || !orders.length
    || !ingredientsDatabase
    || !ingredientsDatabase.length) {
    return (
      <div className={`${styles.loaderContainer} pt-30`}>
        <Loader />
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
