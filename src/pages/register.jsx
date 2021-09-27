import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setValueAction
} from '../services/actions/form-register';
import { registerUser } from '../services/actions/user';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import styles from './page-layout.module.css';

import { regExpEmail } from '../utils/regexp';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    form
  } = useSelector((store) => store.formRegister);
  const {
    REGISTER_REQUEST,
    REGISTER_SUCCESS
  } = useSelector((store) => store.user);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  useEffect(() => {
    if (REGISTER_SUCCESS) {
      history.replace({pathname: '/'});
    }
  }, [history, REGISTER_SUCCESS]);

  const onInputChange = useCallback((evt) => {
    if (evt.target.name === 'email') {
      setIsEmailValid(regExpEmail.test(evt.target.value));
    }
    if (evt.target.name === 'password') {
      setIsPasswordValid(evt.target.value !== '');
    }

    dispatch(setValueAction({
      name: evt.target.name,
      value: evt.target.value
    }));
  }, [dispatch]);


  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if ( form.email !== ''
      && isEmailValid
      && form.password !== ''
      && form.name !== '') {
      dispatch(registerUser(form));
    }
  };

  return (
    <section className={`${styles.formContainer} pt-30`}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Регистрация
      </h1>

      <form onSubmit={handleSubmit}>
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
                error={!isPasswordValid}
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
                error={!isPasswordValid}
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
  );
};
