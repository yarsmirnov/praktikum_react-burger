import React, { useState } from 'react';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';

const initialForm = {
  email: '',
}

export const ForgotPasswordPage = () => {
  const [form, setValue] = useState(initialForm);

  const onInputChange = (evt) => {
    setValue({ ...form, [evt.target.name]: evt.target.value });
  };

  const onButtonClick = () => {

  };

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
            error={false}
            errorText={'Некорректный email'}
            size={'default'}
          />
        </div>

        <div className={'mb-20'}>
          <Button
            type="primary"
            size="medium"
            onClick={onButtonClick}
          >
            Восстановить
          </Button>
        </div>

        <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль? <a href="#nowhere" className={styles.link}>Войти</a>
        </p>
      </section>
    </>
  );
};
