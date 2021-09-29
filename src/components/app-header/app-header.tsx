import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';


const LinksUrl = {
  HOME: '/',
  FEED: '/feed',
  PROFILE: '/profile',
  LOGIN: '/login'
};


const AppHeader = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={`${styles.header_container}`}>
        <nav className={`${styles.appNavigation}`}>
          <ul className={`${styles.list}`}>
            <li className='mr-2 pt-4 pb-4 pl-5 pr-5'>
              <NavLink
                exact
                to={`${LinksUrl.HOME}`}
                className={`${styles.link} text text_type_main-default`}
                activeClassName={`${styles.link} ${styles.link_active} text text_type_main-default`}
              >
                <i className='mr-2'>
                  <BurgerIcon
                    type='primary'
                  />
                </i>
                Конструктор
              </NavLink>
            </li>
            <li className='pt-4 pb-4 pl-5 pr-5'>
              <NavLink
                to={`${LinksUrl.FEED}`}
                className={`${styles.link} text text_type_main-default`}
                activeClassName={`${styles.link} ${styles.link_active} text text_type_main-default`}
              >
                <i className='mr-2'>
                <ListIcon
                  type='primary'
                />
                </i>
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to={`${LinksUrl.HOME}`}>
          <Logo />
        </Link>

        <ul className={`${styles.userMenu}`}>
          <li className='pt-4 pb-4 pl-5 pr-5'>
            { user
              ? (
                <Link
                  to={`${LinksUrl.PROFILE}`}
                  className={`${styles.link} text text_type_main-default`}
                >
                  <i className='mr-2'>
                    <ProfileIcon type="secondary" />
                  </i>
                  Личный кабинет
                </Link>
              )
              : (
                <Link
                  to={`${LinksUrl.LOGIN}`}
                  className={`${styles.link} text text_type_main-default`}
                >
                  <i className='mr-2'>
                    <ListIcon type="secondary" />
                  </i>
                  Войти
                </Link>
              )
            }
          </li>
        </ul>
      </div>
    </header>
  );
};


export default AppHeader;
