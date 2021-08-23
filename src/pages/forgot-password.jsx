import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, resetForm, verifyEmail } from '../services/slices/form-forgot-password';
import { Link, useHistory } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import { regExpEmail } from '../utils/regexp';

import styles from './forgot-password.module.css';


export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_REQUEST, form } = useSelector(store => store.formForgotPassword);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    if (VERIFY_EMAIL_SUCCESS) {
      history.replace({
        pathname: '/reset-password'
      });
    }
    return () => {
      dispatch(resetForm());
    };
  }, [VERIFY_EMAIL_SUCCESS, history, dispatch]);

  const onInputChange = useCallback((evt) => {
    setIsFormValid(regExpEmail.test(evt.target.value));

    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value,
    }));
  }, [dispatch, setIsFormValid]);

  const onButtonClick = useCallback(() => {
    if (isFormValid && form.email !== '') {
      dispatch(verifyEmail());
    }
  }, [dispatch, isFormValid, form]);


  return (
    <>
      <AppHeader />
      <section className={`${styles.container} center-children pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>

        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onInputChange}
            value={form.email}
            name={'email'}
            error={!isFormValid}
            errorText={'Некорректный email'}
            size={'default'}
          />
        </div>

        <div className={'mb-20'}>
          { VERIFY_EMAIL_REQUEST
            ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                size="medium"
                onClick={onButtonClick}
              >
                Восстановить
              </Button>)
          }
        </div>

        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </section>
    </>
  );
};
