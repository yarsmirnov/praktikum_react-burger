import { createSlice } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  refreshTokenRequest,
  registerUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  getUserRequest
} from '../api';


const initialState = {
  REGISTER_REQUEST: false,
  REGISTER_SUCCESS: false,
  REGISTER_FAILURE: false,

  LOGIN_REQUEST: false,
  LOGIN_SUCCESS: false,
  LOGIN_FAILURE: false,

  LOGOUT_REQUEST: false,
  LOGOUT_SUCCESS: false,
  LOGOUT_FAILURE: false,

  GET_USER_REQUEST: false,
  GET_USER_SUCCESS: false,
  GET_USER_FAILURE: false,

  PATCH_USER_REQUEST: false,
  PATCH_USER_SUCCESS: false,
  PATCH_USER_FAILURE: false,

  user: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),

    setRegisterRequest: (state) => ({
      ...state,
      REGISTER_REQUEST: true,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,
      user: null
    }),

    setRegisterSuccess: (state) => ({
      ...state,
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
      REGISTER_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setRegisterFailure: (state) => ({
      ...state,
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: true,
      user: null
    }),

    setLoginRequest: (state) => ({
      ...state,
      LOGIN_REQUEST: true,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,
      user: null
    }),

    setLoginSuccess: (state) => ({
      ...state,
      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
      LOGIN_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setLoginFailure: (state) => ({
      ...state,
      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: true,
      user: null,
    }),

    setLogoutRequest: (state) => ({
      ...state,
      LOGOUT_REQUEST: true,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setLogoutSuccess: (state) => ({
      ...state,
      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: true,
      LOGOUT_FAILURE: false,
      user: null
    }),

    setLogoutFailure: (state) => ({
      ...state,
      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,
      user: state.user ? {...state.user} : null
    }),

    setGetUserRequest: (state) => ({
      ...state,
      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setGetUserSuccess: (state) => ({
      ...state,
      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setGetUserFailure: (state) => ({
      ...state,
      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: true,
      user: state.user ? {...state.user} : null
    }),

    setPatchUserRequest: (state) => ({
      ...state,
      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setPatchUserSuccess: (state) => ({
      ...state,
      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,
      user: state.user ? {...state.user} : null
    }),

    setPatchUserFailure: (state) => ({
      ...state,
      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: true,
      user: state.user ? {...state.user} : null
    }),
  },
});


export const {
  setUser,

  setRegisterRequest,
  setRegisterSuccess,
  setRegisterFailure,

  setLoginRequest,
  setLoginSuccess,
  setLoginFailure,

  setLogoutRequest,
  setLogoutSuccess,
  setLogoutFailure,

  setGetUserRequest,
  setGetUserSuccess,
  setGetUserFailure,

  setPatchUserRequest,
  setPatchUserSuccess,
  setPatchUserFailure
} = userSlice.actions;


export const refreshToken = (afterRefresh) => async (dispatch) => {
  refreshTokenRequest()
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(afterRefresh);
    })
    .catch(err => { throw err });
};

export const registerUser = (form) => async (dispatch) => {
  registerUserRequest(form)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed register user request');
  })
  .then(data => {
    if (data.success) {
      const accessToken = data.accessToken.split('Bearer ')[1];

      dispatch(setUser(data.user));
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(setRegisterSuccess());
      return data;
    }
    throw new Error('Unsuccessful login request');
  })
  .catch(err => {
    dispatch(setRegisterFailure());
    console.error(err);
  });
}

export const loadUserData = () => async (dispatch) => {
  dispatch(setGetUserRequest());

  getUserRequest()
    .then((res) => {
      if (!res.ok && !res.status === 403) {
        throw new Error('Failed get user request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;
      dispatch(setUser(data.user));
      dispatch(setGetUserSuccess());
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(loadUserData()));
      } else {
        dispatch(setUser(null));
        dispatch(setGetUserFailure());
        console.error(err);
      }
    });
};

export const patchUserData = (form) => async (dispatch) => {
  dispatch(setPatchUserRequest());

  patchUserRequest(form)
    .then(res => {
      if (!res.ok && !res.status === 403) {
        throw new Error('Failed get user request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;

      dispatch(setUser(data.user));
      dispatch(setPatchUserSuccess());
      return data;
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(patchUserData(form)));
      } else {
        dispatch(setPatchUserFailure());
        console.error(err);
      }
    });
};

export const loginUser = (form) => async (dispatch) => {
  dispatch(setLoginRequest());

  loginRequest(form)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed login request');
    })
    .then(data => {
      if (data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];

        dispatch(setUser(data.user));
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setLoginSuccess());
        return data;
      }
      throw new Error('Unsuccessful login request');
    })
    .catch(err => {
      dispatch(setLoginFailure());
      console.error(err);
    });
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLogoutRequest());

  logoutRequest()
    .then(response => {
      if (response.ok) {
        dispatch(setUser(null));
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLogoutSuccess());
      }
    })
    .catch(err => {
      dispatch(setLogoutFailure());
      console.error(err);
    });
};


export default userSlice.reducer;
