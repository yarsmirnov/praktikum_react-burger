import React, { useCallback } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../services/slices/user';

import styles from './profile-navigation.module.css';


const LinkClasses = {
  default: `${styles.navLink} text_color_inactive`,
  active: `${styles.navLink_active}`,
}


const ProfileNavigation = ({ extraClasses }) => {
  const dispatch = useDispatch();

  const onExitClick = useCallback((evt) => {
    evt.preventDefault();
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <ul className={`${styles.list} ${extraClasses} text text_type_main-medium`}>
      <li className={`${styles.list_item}`}>
        <NavLink
          to={`/profile`}
          exact
          className={LinkClasses.default}
          activeClassName={LinkClasses.active}
        >
          Профиль
        </NavLink>
      </li>
      <li className={`${styles.list_item}`}>
        <NavLink
          to={`/profile/orders`}
          className={LinkClasses.default}
          activeClassName={LinkClasses.active}
        >
          История заказов
        </NavLink>
      </li>
      <li className={`${styles.list_item}`}>
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
  );
};


ProfileNavigation.propTypes = {
  extraClasses: PropTypes.string,
}


export default ProfileNavigation;
