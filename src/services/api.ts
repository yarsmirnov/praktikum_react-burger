import { getCookie } from '../utils/cookie';
import {
  TUserRegisterForm,
  TUserLoginForm,
  TUserPatchForm,
  TUserForgotPasswordForm,
  TUserResetPasswordForm,
  TOrderSendData
} from './types/api';

export const baseApi = 'https://norma.nomoreparties.space/api';
export const wsAllOrdersApi = 'wss://norma.nomoreparties.space/orders/all';
export const wsUserOrdersApi = 'wss://norma.nomoreparties.space/orders?token=';


type TResponseWithToken = Response & {
  refreshToken: string;
  accessToken: string;
}

export const refreshTokenRequest = async () => {
  return await fetch(`${baseApi}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  }) as TResponseWithToken;
};

export const getIngredientsRequest = async () => {
  return await fetch(`${baseApi}/ingredients`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

export const getUserRequest = async () => {
  return await fetch(`${baseApi}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const getOrderRequest = async (
  orderNumber: string | number
) => {
  return await fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

export const registerUserRequest = async (
  form: TUserRegisterForm
) => {
  return await fetch(`${baseApi}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const loginRequest = async (
  form: TUserLoginForm
) => {
  return await fetch(`${baseApi}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const patchUserRequest = async (
  form: TUserPatchForm
) => {
  return await fetch(`${baseApi}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
};

export const logoutRequest = async () => {
  return await fetch(`${baseApi}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  });
};

export const orderRequest = async (
  orderData: TOrderSendData
) => {
  return await fetch(`${baseApi}/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(orderData),
  })
};

export const forgotPasswordRequest = async (
  form: TUserForgotPasswordForm
) => {
  return await fetch(`${baseApi}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form),
  });
};

export const resetPasswordRequest = async (
  form: TUserResetPasswordForm
) => {
  return await fetch(`${baseApi}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form),
  });
};
