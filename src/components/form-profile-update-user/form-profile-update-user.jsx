import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialValue,
  setValue,
  resetForm,
  clearForm,
} from '../../services/slices/form-profile';
import { patchUserData } from '../../services/slices/user';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from "../loader/loader";

import styles from './form-profile-update-user.module.css';


const FormProfileUpdateUser = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((store) => store.formProfile);
  const {
    user,
    PATCH_USER_REQUEST,
  } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(setInitialValue(user));
    return () => {
      dispatch(clearForm());
    }
  }, [dispatch, user]);

  const onInputChange = useCallback((evt) => {
    dispatch(setValue({
      name: evt.target.name,
      value: evt.target.value,
    }));
  }, [dispatch]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(patchUserData(form));
  }, [dispatch, form]);

  const onResetButtonClick = useCallback((evt) => {
    evt.preventDefault();
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <form
      className={`${styles.form}`}
      onSubmit={handleSubmit}
    >
      <div className={`${styles.inputWrapper} mb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onInputChange}
          icon={'EditIcon'}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Недопустимое имя'}
          size={'default'}
        />
      </div>

      <div className={`${styles.inputWrapper} mb-6`}>
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={onInputChange}
          icon={'EditIcon'}
          value={form.email}
          name={'email'}
          error={false}
          errorText={'Некоррекнтый email'}
          size={'default'}
        />
      </div>

      <div className={`${styles.inputWrapper} mb-6`}>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onInputChange}
          icon={'EditIcon'}
          value={form.password}
          name={'password'}
          error={false}
          errorText={'Недопустимые символы'}
          size={'default'}
        />
      </div>

      <div className={`${styles.formControls}`}>
        <Button
          type="secondary"
          size="medium"
          onClick={onResetButtonClick}
        >
          Отменить
        </Button>

        { PATCH_USER_REQUEST
          ? (<Loader />)
          : (
            <Button
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          )
        }
      </div>
    </form>
  );
};


export default FormProfileUpdateUser;