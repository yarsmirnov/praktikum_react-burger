import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { orderType } from '../../utils/types';

import styles from './orders-summary.module.css';


const MAX_ORDERS_TO_SHOW = 5;
const getLastordersByStatus = (orders, status, count) => {
  const filteredOrders = orders.filter((order) => order.status === status);
  return filteredOrders.slice(0, count);
};


const OrdersSummary = ({orders, total, totalToday}) => {
  const doneOrders = useMemo(
    () => getLastordersByStatus(orders, 'done', MAX_ORDERS_TO_SHOW),
    [orders]
  );
  const inProgressOrders = useMemo(
    () => getLastordersByStatus(orders, 'cooking', MAX_ORDERS_TO_SHOW),
    [orders]
  );

  return (
    <>
      <div className={`${styles.ordersStatusContainer} mb-15`}>
        <div className={`${styles.ordersStatusColumn} mr-6`}>
          <h3
            className={`${styles.orderStatusTitle} text text_type_main-medium mb-6`}
          >
            Готовы:
          </h3>
          <ul className={`${styles.ordersList}`}>
            { doneOrders.map((order) => {
              const orderIdToShow = String(order.number).padStart(6, 0);

              return (
                <li className={`mb-2`} key={order.number}>
                  <p className={`${styles.orderId} ${styles.orderId_done} text text_type_digits-default`}>
                    { orderIdToShow }
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={`${styles.ordersStatusColumn}`}>
          <h3
            className={`${styles.orderStatusTitle} text text_type_main-medium mb-6`}
          >
            В работе:
          </h3>
          <ul className={`${styles.ordersList}`}>
            { inProgressOrders.map((order) => {
              const orderIdToShow = String(order.number).padStart(6, 0);

              return (
                <li className={`mb-2`} key={order.number}>
                  <p className={`${styles.orderId} text text_type_digits-default`}>
                    { orderIdToShow }
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <h3 className={`text text_type_main-medium`}>
        Выполнено за все время:
      </h3>
      <p className={`text text_type_digits-large text-with-glow mb-15`}>
        { total }
      </p>

      <h3 className={`text text_type_main-medium`}>
      Выполнено за сегодня:
      </h3>
      <p className={`text text_type_digits-large text-with-glow`}>
        { totalToday }
      </p>
    </>
  );
};


OrdersSummary.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(orderType)).isRequired,
  total: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired,
};


export default OrdersSummary;
