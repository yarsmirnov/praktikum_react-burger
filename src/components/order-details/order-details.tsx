import React from "react";

import styles from './order-details.module.css';
import successGif from '../../images/done.gif';


const OrderDetails = () => {
  return (
    <>
      <h2 className='visually-hidden'>Заказ передан в обработку</h2>

      <dl className={`${styles.order} mt-30`}>
        <dt className={`${styles.orderText} text_type_main-medium`}>идентификатор заказа</dt>
        <dd className={`${styles.orderId} text_type_digits-large mb-8`}>034536</dd>
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
