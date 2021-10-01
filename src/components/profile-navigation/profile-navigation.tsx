import React, { useCallback, FC } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';

import { logoutUser } from '../../services/actions/user';

import styles from './profile-navigation.module.css';


type TProfileNavigationProps = {
  extraClasses: string;
}

const LinkClasses = {
  default: `${styles.navLink} text_color_inactive`,
  active: `${styles.navLink_active}`,
}


const ProfileNavigation: FC<TProfileNavigationProps> = ({ extraClasses }) => {
  const dispatch = useDispatch();

  const onExitClick = useCallback((evt: React.MouseEvent) => {
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
          onClick={onExitClick}
        >
          Выход
        </Link>
      </li>
    </ul>
  );
};


export default ProfileNavigation;
