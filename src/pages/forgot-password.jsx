import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';

const initialForm = {
  email: '',
  password: '',
  verifyCode: '',
}

const Steps = {
  STEP_1: 'STEP_1:VERIFY_EMAIL',
  STEP_2: 'STEP_2:SET_NEW_PASSORD',
};


export const ForgotPasswordPage = () => {
  const [form, setValue] = useState(initialForm);
  const [resetPasswordStep, setStep] = useState(Steps.STEP_1);
  const [isEmailVerified: setIsEmailVerified] = useState(false);
  const [isPasswordVisable, setPasswordVisability] = useState(false);

  const onInputChange = (evt) => {
    setValue({ ...form, [evt.target.name]: evt.target.value });
  };

  const onButtonClick = () => {

  };

  const onIconClick = () => {
    setPasswordVisability(!isPasswordVisable);
  };

  const stepOneContent = (
    <>
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
    </>
  );

  const stepTwoContent = (
    <>
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
          value={form.verifyCode}
          name={'verifyCode'}
          error={false}
          errorText={'Неверный код'}
          size={'default'}
        />
      </div>

      <div className={'mb-20'}>
        <Button
          type="primary"
          size="medium"
          onClick={onButtonClick}
        >
          Сохранить
        </Button>
      </div>
    </>
  );

  const getStepContent = (step) => {
    switch (step) {
      case Steps.STEP_1: {
        return stepOneContent;
      }
      case Steps.STEP_2: {
        return stepTwoContent;
      }
      default: {
        return stepOneContent;
      }
    }
  };

  return (
    <>
      <AppHeader />
      <section className={`${styles.container} center-children pt-30`}>
        <h1 className={`text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>

        { getStepContent(resetPasswordStep) }

        <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </section>
    </>
  );
};
