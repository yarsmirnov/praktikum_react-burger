import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';

const initialForm = {
  name: '',
  email: '',
  password: '',
}

export const RegisterPage = () => {
  const [form, setValue] = useState(initialForm);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  const onInputChange = (evt) => {
    setValue({ ...form, [evt.target.name]: evt.target.value });
  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  const onButtonClick = () => {

  };

  return (
    <>
      <AppHeader />
      <section className={`${styles.container} center-children pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Регистрация
        </h1>

        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onInputChange}
            value={form.email}
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

        <div className={'mb-20'}>
          <Button
            type="primary"
            size="medium"
            onClick={onButtonClick}
          >
            Зарегистрироваться
          </Button>
        </div>

        <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </section>
    </>
  );
};
