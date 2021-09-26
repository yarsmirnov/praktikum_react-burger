import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setValueAction,
  resetPasswordAction,
  clearFormAction
 } from '../services/actions/form-reset-password';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import styles from './page-layout.module.css';


export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    form,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
  } = useSelector((store) => store.formResetPassword);
  const { verifiedEmail } = useSelector((store) => store.formForgotPassword);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  useEffect(() => {
    if (!verifiedEmail) {
      history.replace({
        pathname: '/forgot-password',
      })
    }
    if (RESET_PASSWORD_SUCCESS) {
      history.replace({
        pathname: '/login',
      })
    }

    return () => {
      dispatch(clearFormAction());
    };
  }, [dispatch, history, verifiedEmail, RESET_PASSWORD_SUCCESS]);

  const onInputChange = useCallback((evt) => {
    if (evt.target.name === 'password') {
      setIsPasswordValid(evt.target.value !== '');
    }

    dispatch(setValueAction({
      name: evt.target.name,
      value: evt.target.value,
    }));
  }, [dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if ( form.password !== ''
      && form.token !== '') {
        dispatch(resetPasswordAction());
      }
  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  return (
    <section className={`${styles.formContainer} pt-30`}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>

      <form onSubmit={handleSubmit}>
        <div className={`${styles.inputWrapper} mb-6`}>
          { isPasswordVisable
            ? (
              <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={onInputChange}
                icon={'HideIcon'}
                value={form.password}
                name={'password'}
                error={!isPasswordValid}
                onIconClick={onIconClick}
                errorText={'Недопустимые символы'}
                size={'default'} />
              ) : (
              <Input
                type={'password'}
                placeholder={'Введите новый пароль'}
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

        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onInputChange}
            value={form.token}
            name={'token'}
            error={RESET_PASSWORD_FAILURE}
            errorText={'Неверный код'}
            size={'default'}
          />
        </div>

        <div className={'mb-20'}>
          { RESET_PASSWORD_REQUEST
          ? (
            <Loader />
          )
          : (
            <Button
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          )}
        </div>
      </form>

      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </section>
  );
};
