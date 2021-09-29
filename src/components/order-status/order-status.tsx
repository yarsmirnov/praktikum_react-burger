import React, { FC } from 'react';
import styles from './order-status.module.css';


type TStatus = 'created' | 'canceled' | 'pending' | 'done';

type TOrderStatusProps = {
  status: TStatus;
}


const getStatusText = (status: TStatus): string => {
  switch (status) {
    case 'done':
      return 'Выполнен';

    case 'created':
      return 'Создан';

    case 'pending':
      return 'Готовится';

    case 'canceled':
      return 'Отменён'

    default:
      return 'Не определён';
  }
};


const OrderStatus: FC<TOrderStatusProps> = ({ status }) => {
  return (
    <span className={`${styles.default} ${styles[status]}`}>
      { getStatusText(status) }
    </span>
  );
};


export default OrderStatus;
