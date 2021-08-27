import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
import { setUser } from './auth';

const initialState = {
  REGISTER_REQUEST: false,
  REGISTER_SUCCESS: false,
  REGISTER_FAILURE: false,

  form: {
    email: "",
    password: "",
    name: "",
  }
}

const registerApi = 'https://norma.nomoreparties.space/api/auth/register';

export const formRegisterSlice = createSlice({
  name: 'formRegister',
  initialState,
  reducers: {
    setValue: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        [action.payload.name]: action.payload.value,
      }
    }),

    resetForm: () => initialState,

    request: (state) => ({
      ...state,
      REGISTER_REQUEST: true,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,
      form: {...state.form},
    }),

    success: (state) => ({
      ...state,
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
      REGISTER_FAILURE: false,
      form: {...state.form},
    }),

    failure: (state) => ({
      ...state,
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: true,
      form: {...state.form},
    }),
  }
});


export const {
  setValue,
  resetForm,
  request,
  success,
  failure,
} = formRegisterSlice.actions;


export const registerUser = () => async (dispatch, getState) => {
  const data = getState().formRegister.form;
  dispatch(request());

  fetch(registerApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    dispatch(failure());
    throw new Error('Failed new user registration request');
  })
  .then(data => {
    if (data.success) {
      dispatch(success());
      dispatch(setUser(data.user));
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } else {
      dispatch(failure());
    }
    return data;
  })
  .catch(err => {
    dispatch(failure);
    console.error(err);
  });
};


export default formRegisterSlice.reducer;
