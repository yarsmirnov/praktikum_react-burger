import { createSlice } from '@reduxjs/toolkit';
import { loginRequest } from '../api';
import { setUser } from './auth';
import { setCookie } from '../../utils/cookie';

const initialState = {
  LOGIN_REQUEST: false,
  LOGIN_SUCCESS: false,
  LOGIN_FAILURE: false,

  form: {
    email: "",
    password: "",
  }
};


export const formRegisterSlice = createSlice({
  name: 'formLogin',
  initialState,
  reducers: {
    setValue: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        [action.payload.name]: action.payload.value,
      }
    }),

    clearForm: () => initialState,

    request: (state) => ({
      ...state,
      LOGIN_REQUEST: true,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,
      form: {...state.form},
    }),

    success: (state) => ({
      ...state,
      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
      LOGIN_FAILURE: false,
      form: {...state.form},
    }),

    failure: (state) => ({
      ...state,
      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: true,
      form: {...state.form},
    }),
  }
});


export const {
  setValue,
  clearForm,
  request,
  success,
  failure,
} = formRegisterSlice.actions;



export const authUser = () => (dispatch, getState) => {
  const formData = getState().formLogin.form;

  dispatch(request());

  loginRequest(formData)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(failure());
      throw new Error('Failed login request');
    })
    .then(data => {
      if (data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        dispatch(success());
        dispatch(setUser(data.user));
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        dispatch(failure());
      }
    })
    .catch(err => {
      dispatch(failure());
      console.error(err);
    });
};


export default formRegisterSlice.reducer;
