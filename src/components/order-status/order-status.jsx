import React from 'react';
import PropTypes from 'prop-types';

import styles from './order-status.module.css';


const getStatusText = (status) => {
  switch (status) {
    case 'done':
      return 'Выполнен';

    case 'created':
      return 'Создан';

    case 'pending':
      return 'Готовится';

    case 'canseled':
      return 'Отменён'

    default:
      return 'Не определён';
  }
};


const OrderStatus = ({ status }) => {
  return (
    <span className={`${styles.default} ${styles[status]}`}>
      { getStatusText(status) }
    </span>
  );
};


OrderStatus.propTypes = {
  status: PropTypes.oneOf(['created', 'pending', 'done', 'canseled']),
}


export default OrderStatus;
