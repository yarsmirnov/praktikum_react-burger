import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';

import successGif from '../../images/done.gif';

import styles from './order-details.module.css';


const OrderDetails: FC<{}> = () => {
  const { orderData } = useSelector((store) => store.order);

  return (
    <>
      <h2 className='visually-hidden'>Заказ передан в обработку</h2>

      <dl className={`${styles.order} mt-30`}>
        <dt className={`${styles.orderText} text_type_main-medium`}>идентификатор заказа</dt>
        <dd className={`${styles.orderId} text_type_digits-large mb-8`}>
          { orderData['number'] ? orderData['number'] : null }
        </dd>
      </dl>

      <img
        className='mt-15 mb-15'
        alt='Success!'
        src={successGif}
        width='120'
        height='120'
      />

      <p className={`${styles.text} text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.text} text_type_main-default text_color_inactive mb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}


export default OrderDetails;
