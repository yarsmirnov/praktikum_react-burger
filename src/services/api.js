import { getCookie } from '../utils/cookie';

// export const deserializeQuery = (query, noQuestionMark = false) => {
//   const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
//   const array = pairs.map(elem => elem.split('='));
//   return Object.fromEntries(array);
// };

// export const serializeQuery = queryParams =>
//   Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
//     if (typeof value === 'undefined') {
//       return acc;
//     }
//     const postfix = index === array.length - 1 ? '' : '&';
//     return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
//   }, '?');

// export const getCountriesRequest = async () =>
//   await fetch('https://cosmic.nomoreparties.space/api/countries', {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('token')
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer'
//   })
//     .then(res => res.json())
//     .then(({ countries }) => countries);

// export const getLaureatesRequest = async () =>
//   await fetch('https://cosmic.nomoreparties.space/api/laureates', {
//     method: 'GET',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('token')
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer'
//   })
//     .then(res => res.json())
//     .then(({ laureates }) => laureates);


const baseApi = 'https://norma.nomoreparties.space/api'
const loginApi = `${baseApi}/auth/login`;
// const logoutApi = `${baseApi}/auth/logout`;
// const refreshTokenApi = `${baseApi}/auth/token`;
// const userApi = `${baseApi}/auth/user`;

export const loginRequest = async form => {
  return await fetch(loginApi, {
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
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

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
    referrerPolicy: 'no-referrer'
  });
};
