import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.appNavigation} text_type_main-default`}>
        <li className='mr-2 pt-4 pb-4 pl-5 pr-5'>
          <a className={styles.link} href="#nowhere">
            <i className='mr-2'>
              <BurgerIcon type="primary" />
            </i>
            Конструктор
          </a>
        </li>
        <li className='pt-4 pb-4 pl-5 pr-5 text_color_inactive'>
          <a className={styles.link} href="#nowhere">
            <i className='mr-2'>
            <ListIcon type="secondary" />
            </i>
            Лента заказов
          </a>
        </li>
      </nav>

      <Link to={'/'}>
        <Logo />
      </Link>

      <ul className={`${styles.userMenu} text_type_main-default`}>
        <li className='pt-4 pb-4 pl-5 pr-5 text_color_inactive'>
          { user
            ? (
              <Link to={'/profile'} className={styles.link}>
                <i className='mr-2'>
                  <ProfileIcon type="secondary" />
                </i>
                Личный кабинет
              </Link>
            )
            : (
              <Link to={'/login'} className={styles.link}>
                <i className='mr-2'>
                  <ListIcon type="secondary" />
                </i>
                Войти
              </Link>
            )
          }

          <a className={styles.link} href="#nowhere">
          </a>
        </li>
      </ul>

    </header>
  );
}

export default AppHeader;
