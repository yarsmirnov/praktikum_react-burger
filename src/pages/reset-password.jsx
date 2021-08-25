import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, resetPassword, resetForm  } from '../services/slices/form-reset-password';

import AppHeader from '../components/app-header/app-header';
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
  } = useSelector(store => store.formResetPassword);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  useEffect(() => {
    if (RESET_PASSWORD_SUCCESS) {
      history.replace({
        pathname: '/',
      })
    }

    return () => {
      dispatch(resetForm());
    };
  }, [dispatch, history, RESET_PASSWORD_SUCCESS]);

  const onInputChange = useCallback((evt) => {
    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value,
    }));
  }, [dispatch]);

  const onButtonClick = () => {
    dispatch(resetPassword());
  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  return (
    <>
      <AppHeader />

      <section className={`${styles.formContainer} pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>

        <form>
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
                  error={false}
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
                onClick={onButtonClick}
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
    </>
  );

};
