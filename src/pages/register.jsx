import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../services/slices/form-register';
import { registerUser } from '../services/slices/user';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import styles from './page-layout.module.css';

import { regExpEmail } from '../utils/regexp';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    form
  } = useSelector(store => store.formRegister);
  const {
    REGISTER_REQUEST,
    REGISTER_SUCCESS
  } = useSelector(store => store.user);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  useEffect(() => {
    if (REGISTER_SUCCESS) {
      history.replace({pathname: '/'});
    }
  }, [history, REGISTER_SUCCESS]);

  const onInputChange = (evt) => {
    if (evt.target.name === 'email') {
      setIsEmailValid(regExpEmail.test(evt.target.value));
    }
    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value,
    }))
  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  const onButtonClick = (evt) => {
    evt.preventDefault();
    if (form.email !== ''
      && isEmailValid
      && form.password !== ''
      && form.name !== '') {
      dispatch(registerUser(form));
    }
  };

  return (
    <>
      <AppHeader />
      <section className={`${styles.formContainer} pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Регистрация
        </h1>

        <form>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onInputChange}
              value={form.name}
              name={'name'}
              error={false}
              errorText={'Недопустимые символы'}
              size={'default'}
            />
          </div>

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

          <div className={'mb-20'}>
            { REGISTER_REQUEST
              ? (<Loader />)
              : (
                <Button
                  type="primary"
                  size="medium"
                  onClick={onButtonClick}
                >
                  Зарегистрироваться
                </Button>
              )
            }
          </div>
        </form>

        <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </section>
    </>
  );
};
