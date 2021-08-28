import { getCookie } from '../utils/cookie';


const baseApi = 'https://norma.nomoreparties.space/api'


export const registerUserRequest = async (form) => {
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

export const loginRequest = async (form) => {
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

export const getUserRequest = async () =>
  await fetch(`${baseApi}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

export const patchUserRequest = async (form) => {
  return await fetch(`${baseApi}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
};

export const logoutRequest = async (refreshToken) => {
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
    body: JSON.stringify({token: refreshToken})
  });
};
