import { createSlice } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { getUserRequest, logoutRequest } from '../api';


const initialState = {
  user: null,
};


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

    removeUser: () => initialState,
  },
});


export const { setUser, removeUser } = authSlice.actions;


const refreshToken = (afterRefresh) => (dispatch) => {
  refreshToken()
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(afterRefresh);
    });
};

export const loadUserData = () => (dispatch) => {
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

export const logout = () => async (dispatch) => {
  logoutRequest(localStorage.getItem('refreshToken'))
    .then(response => {
      if (response.ok) {
        dispatch(removeUser());
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    })
    .catch(err => console.error(err));
};


export default authSlice.reducer;
