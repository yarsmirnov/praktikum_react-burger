import React, { useState, useMemo, useCallback, FC } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { loginUser } from '../services/actions/user';

import {
  setValueAction,
  clearFormAction
} from '../services/actions/form-login';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../components/loader/loader';

import { regExpEmail } from '../utils/regexp';

import styles from './page-layout.module.css';


export const LoginPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { form } = useSelector((store) => store.formLogin);
  const { user, LOGIN_REQUEST, LOGIN_SUCCESS } = useSelector((store) => store.user);
  const [isPasswordVisable, setPasswordVisability] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const { from } = useMemo((): any => {
    return location.state || { from: { pathname: '/' } }
  }, [location]);

  const onInputChange = useCallback((
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (form.email !== ''
      && isEmailValid
      && form.password !== '') {
        dispatch(loginUser(form));
      }
  };

  if (LOGIN_SUCCESS && user) {
    history.replace(from);
    dispatch(clearFormAction());
  } else if (user) {
    return (
      <Redirect
        to={'/'}
      />
    );
  }

  return (
    <section className={`${styles.formContainer} pt-30`}>
      <h1 className={`text text_type_main-medium mb-6`}>
        ????????
      </h1>

      <form
        className={`${styles.form} mb-20`}
        onSubmit={handleSubmit}
      >
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onInputChange}
            value={form.email}
            name={'email'}
            error={!isEmailValid}
            errorText={'???????????????????????? email'}
            size={'default'}
          />
        </div>

        <div className={`${styles.inputWrapper} mb-6`}>
          { isPasswordVisable
            ? (
              <Input
                type={'text'}
                placeholder={'????????????'}
                onChange={onInputChange}
                icon={'HideIcon'}
                value={form.password}
                name={'password'}
                error={!isPasswordValid}
                onIconClick={onIconClick}
                errorText={'???? ?????????? ???????? ????????????'}
                size={'default'} />
              ) : (
              <Input
                type={'password'}
                placeholder={'????????????'}
                onChange={onInputChange}
                icon={'ShowIcon'}
                value={form.password}
                name={'password'}
                error={!isPasswordValid}
                onIconClick={onIconClick}
                errorText={'???? ?????????? ???????? ????????????'}
                size={'default'} />)
          }
        </div>

        { LOGIN_REQUEST
          ? ( <Loader /> )
          : (
            <Button
              type="primary"
              size="medium"
            >
              ??????????
            </Button>
          )
        }
      </form>

      <p className={'text text_type_main-default text_color_inactive mb-4'}>
        ????????? ?????????? ????????????????????????? <Link to='/register' className={styles.link}>????????????????????????????????????</Link>
      </p>

      <p className={'text text_type_main-default text_color_inactive'}>
        ???????????? ????????????? <Link to='/forgot-password' className={styles.link}>???????????????????????? ????????????</Link>
      </p>
    </section>
  );
};
