import React, { useMemo, useCallback, useEffect } from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import {
  setInitialValue,
  setValue,
  resetForm,
  clearForm,
} from '../services/slices/form-profile';
import { patchUserData, logoutUser } from '../services/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';


import styles from './profile.module.css';
import layoutStyles from './page-layout.module.css';


const PageTitles = {
  profile: `Провиль пользователя`,
  orders: 'История заказов',
};

const LinkClasses = {
  default: `${styles.nav_link} text text_type_main-medium text_color_inactive`,
  active: `${styles.nav_linkActive} text text_type_main-medium`,
}


export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { form } = useSelector((store) => store.formProfile);
  const {
    user,
    PATCH_USER_REQUEST,
  } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(setInitialValue(user));
    return () => {
      dispatch(clearForm());
    }
  }, [dispatch, user]);

  const titleContent = useMemo(() => {
    return PageTitles.profile;
  }, []);

  const onExitClick = useCallback((evt) => {
    evt.preventDefault();
    dispatch(logoutUser());
  }, [dispatch]);

  const onInputChange = useCallback((evt) => {
    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value,
    }));
  }, [dispatch]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(patchUserData(form));
  }, [dispatch, form]);

  const onResetButtonClick = useCallback((evt) => {
    evt.preventDefault();
    dispatch(resetForm());
  }, [dispatch]);


  return (
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
                exact
                className={LinkClasses.default}
                activeClassName={LinkClasses.active}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${styles.profileNav_item}`}>
              <NavLink
                to={`${url}/orders`}
                exact
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
          <form
            className={`${styles.profileForm}`}
            onSubmit={handleSubmit}
          >
            <div className={`${layoutStyles.inputWrapper} mb-6`}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onInputChange}
                icon={'EditIcon'}
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Недопустимое имя'}
                size={'default'}
              />
            </div>

            <div className={`${layoutStyles.inputWrapper} mb-6`}>
              <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={onInputChange}
                icon={'EditIcon'}
                value={form.email}
                name={'email'}
                error={false}
                errorText={'Некоррекнтый email'}
                size={'default'}
              />
            </div>

            <div className={`${layoutStyles.inputWrapper} mb-6`}>
              <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onInputChange}
                icon={'EditIcon'}
                value={form.password}
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
                onClick={onResetButtonClick}
              >
                Отменить
              </Button>

              { PATCH_USER_REQUEST
                ? (<Loader />)
                : (
                  <Button
                    type="primary"
                    size="medium"
                  >
                    Сохранить
                  </Button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
