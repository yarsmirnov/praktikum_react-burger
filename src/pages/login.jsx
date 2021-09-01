import React, { useState, useMemo } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../services/slices/user';

import { setValue, clearForm } from '../services/slices/form-login';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import { regExpEmail } from '../utils/regexp';

import styles from './page-layout.module.css';


export const LoginPage = () => {
  const dispatch = useDispatch(store => store.user);
  const history = useHistory();
  const location = useLocation();
  const { form } = useSelector(store => store.formLogin);
  const { user, LOGIN_REQUEST, LOGIN_SUCCESS } = useSelector(store => store.user);
  const [isPasswordVisable, setPasswordVisability] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const { from } = useMemo(() => {
    return location.state || { from: { pathname: '/' } }
  }, [location]);

  const onInputChange = (evt) => {
    if (evt.target.name === 'email') {
      setIsEmailValid(regExpEmail.test(evt.target.value));
    }
    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value
    }));
  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  const onButtonClick = (evt) => {
    evt.preventDefault();
    if (form.email !== ''
      && isEmailValid
      && form.password !== '') {
        dispatch(loginUser(form));
      }
  };

  if (LOGIN_SUCCESS && user) {
    history.replace(from);
    dispatch(clearForm());
  } else if (user) {
    return (
      <Redirect
        to={'/'}
      />
    );
  }

  return (
    <>
      <AppHeader />

      <section className={`${styles.formContainer} pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Вход
        </h1>

        <form className={`${styles.form} mb-20`}>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onInputChange}
              value={form.email}
              name={'email'}
              error={!isEmailValid}
              errorText={'Некорректный email'}
              size={'default'}
            />
          </div>

          <div className={`${styles.inputWrapper} mb-6`}>
            { isPasswordVisable
              ? (
                <Input
                  type={'text'}
                  placeholder={'Пароль'}
                  onChange={onInputChange}
                  icon={'HideIcon'}
                  value={form.password}
                  name={'password'}
                  error={form.password.length ? false : true}
                  onIconClick={onIconClick}
                  errorText={'Не может быть пустым'}
                  size={'default'} />
                ) : (
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  onChange={onInputChange}
                  icon={'ShowIcon'}
                  value={form.password}
                  name={'password'}
                  error={form.password.length ? false : true}
                  onIconClick={onIconClick}
                  errorText={'Не может быть пустым'}
                  size={'default'} />)
            }
          </div>

          { LOGIN_REQUEST
            ? ( <Loader /> )
            : (
              <Button
                type="primary"
                size="medium"
                onClick={onButtonClick}
              >
                Войти
              </Button>
            )
          }
        </form>

        <p className={'text text_type_main-default text_color_inactive mb-4'}>
          Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>

        <p className={'text text_type_main-default text_color_inactive'}>
          Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
      </section>
    </>
  );
};
