import React, { FC } from 'react';

import ProfileNavigation from '../components/profile-navigation/profile-navigation';
import FormProfileUpdateUser from '../components/form-profile-update-user/form-profile-update-user';

import styles from './profile.module.css';


export const ProfilePage: FC<{}> = () => {
  return (
    <section className={`${styles.pageContainer} pt-10`}>
      <h1 className={`visualliHidden`}>
        { `Провиль пользователя` }
      </h1>

      <div className={`${styles.columnsContainer} mr-15`}>
        <div className={`${styles.navContainer} mr-15`}>
          <ProfileNavigation extraClasses={`mb-20`} />

          <p className={`text text_type_main-default text-dark`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <div className={`${styles.profileContent}`}>
          <FormProfileUpdateUser />
        </div>
      </div>
    </section>
  );
};
