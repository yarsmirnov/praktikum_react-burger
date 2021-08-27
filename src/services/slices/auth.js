import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
import { getUserRequest } from '../api';

const initialState = {
  user: null,
};

// const loginApi = 'https://norma.nomoreparties.space/api/auth/login';
// const logoutApi = 'https://norma.nomoreparties.space/api/auth/logout';
// const refreshTokenApi = 'https://norma.nomoreparties.space/api/auth/token';

// const checkResponse = (response) => {
//   return response.ok ? response.json() : response.json().then(err => Promise.reject(err));
// }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: {
        ...action.payload,
      }
    }),
  },
});


export const { setUser } = authSlice.actions;


const refreshToken = (afterRefresh) => (dispatch, getState, {api}) => {
  api.refreshToken()
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(afterRefresh);
    });
};

export const loadUserData = () => (dispatch, getState, {api}) => {
  getUserRequest()
    .then((res) => {
      if (!res.success) throw res;
      dispatch(setUser(res.user));
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(loadUserData()));
      }
    });
};




export default authSlice.reducer;
