import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authUser } from '../services/slices/form-login';

import { setValue, resetForm } from '../services/slices/form-login';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import styles from './page-layout.module.css';


export const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, LOGIN_REQUEST, LOGIN_SUCCESS } = useSelector(store => store.formLogin);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  useEffect(() => {
    if (LOGIN_SUCCESS) {
      history.replace({pathname: '/'});
    }
    return () => {
      dispatch(resetForm());
    }
  }, [history, dispatch, LOGIN_SUCCESS]);

  const onInputChange = (evt) => {
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
    dispatch(authUser());
  };

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
              error={false}
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
                  error={false}
                  onIconClick={onIconClick}
                  errorText={'Недопустимые символы'}
                  size={'default'} />
                ) : (
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  onChange={onInputChange}
                  icon={'ShowIcon'}
                  value={form.password}
                  name={'password'}
                  error={false}
                  onIconClick={onIconClick}
                  errorText={'Недопустимые символы'}
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
