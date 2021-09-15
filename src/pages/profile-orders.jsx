import React from 'react';

import ProfileNavigation from '../components/profile-navigation/profile-navigation';
import UserOrders from '../components/user-orders/user-orders';

import styles from './profile.module.css';


export const ProfileOrdersPage = () => {
  return (
    <section className={`${styles.pageContainer} pt-10`}>
      <h1 className={`visualliHidden`}>
        { `История заказов` }
      </h1>

      <div className={`${styles.columnsContainer} mr-15`}>
        <div className={`${styles.navContainer} mr-15`}>
          <ProfileNavigation extraClasses={`mb-20`} />

          <p className={`text text_type_main-default text-dark`}>
            В этом разделе вы можете просмотреть историю ваших заказов
          </p>
        </div>

        <div className={`${styles.profileContent}`}>
          <UserOrders />
        </div>
      </div>
    </section>
  );
};
