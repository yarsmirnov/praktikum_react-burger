import React, { useMemo, useCallback } from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';


import styles from './profile.module.css';


const PageTitles = {
  profile: `Провиль пользователя`,
  orders: 'История заказов',
};

const LinkClasses = {
  default: `${styles.nav_link} text text_type_main-medium text_color_inactive`,
  active: `${styles.nav_linkActive} text text_type_main-medium`,
}


export const ProfilePage = () => {
  const { url } = useRouteMatch();

  const titleContent = useMemo(() => {
    return PageTitles.profile;
  }, []);

  const onExitClick = useCallback((evt) => {
    evt.preventDefault();
  }, []);

  const onInputChange = useCallback((evt) => {
    evt.preventDefault();
  }, []);


  return (
    <>
      <AppHeader />

      <section className={`${styles.pageContainer} pt-30`}>
        <h1 className={`visualliHidden`}>
          { titleContent }
        </h1>
        <div className={`${styles.columnsContainer} mr-15`}>
          <div className={`${styles.navContainer} mr-15`}>
            <ul className={`${styles.profileNav} mb-20`}>
              <li className={`${styles.profileNav_item}`}>
                <NavLink
                  to={`/profile`}
                  className={LinkClasses.default}
                  activeClassName={LinkClasses.active}
                >
                  Профиль
                </NavLink>
              </li>
              <li className={`${styles.profileNav_item}`}>
                <NavLink
                  to={`${url}/orders`}
                  className={LinkClasses.default}
                  activeClassName={LinkClasses.active}
                >
                  История заказов
                </NavLink>
              </li>
              <li className={`${styles.profileNav_item}`}>
                <Link
                  to={`/`}
                  className={LinkClasses.default}
                  activeClassName={LinkClasses.active}
                  onClick={onExitClick}
                >
                  Выход
                </Link>
              </li>
            </ul>

            <p className={`text text_type_main-default text-dark`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={`${styles.profileContent}`}>
            <form className={`${styles.profileForm}`}>
              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={onInputChange}
                  icon={'EditIcon'}
                  value={''}
                  name={'name'}
                  error={false}
                  errorText={'Недопустимое имя'}
                  size={'default'}
                />
              </div>

              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type={'email'}
                  placeholder={'Логин'}
                  onChange={onInputChange}
                  icon={'EditIcon'}
                  value={''}
                  name={'email'}
                  error={false}
                  errorText={'Некоррекнтый email'}
                  size={'default'}
                />
              </div>

              <div className={`${styles.inputWrapper} mb-6`}>
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  onChange={onInputChange}
                  icon={'EditIcon'}
                  value={''}
                  name={'password'}
                  error={false}
                  errorText={'Недопустимые символы'}
                  size={'default'}
                />
              </div>

              <div className={`${styles.profileForm_controls}`}>
                <Button
                  type="secondary"
                  size="medium"
                >
                  Отменить
                </Button>
                <Button
                  type="primary"
                  size="medium"
                >
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
