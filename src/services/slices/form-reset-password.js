import { createSlice } from '@reduxjs/toolkit';
import { resetPasswordRequest } from '../api';


export const initialState = {
  RESET_PASSWORD_REQUEST: false,
  RESET_PASSWORD_SUCCESS: false,
  RESET_PASSWORD_FAILURE: false,

  form: {
    password: '',
    token: '',
  }
};

export const formResetPasswordSlice = createSlice({
  name: 'formResetPassword',
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
      RESET_PASSWORD_REQUEST: true,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {...state.form},
    }),

    success: (state) => ({
      ...state,
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_FAILURE: false,
      form: {...initialState.form},
    }),

    failure: (state) => ({
      ...state,
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: true,
      form: {...state.form},
    }),
  },
});


export const {
  setValue,
  clearForm,
  request,
  success,
  failure
} = formResetPasswordSlice.actions;


export const resetPassword = () => async (dispatch, getState) => {
  const formData = getState().formResetPassword.form;

  dispatch(request());

  await resetPasswordRequest(formData)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(failure());
      throw new Error('Failed reset password request');
    })
    .then(data => {
      if (data.success) {
        dispatch(success());
      }
      return data;
    })
    .catch(err => {
      dispatch(failure());
      console.error(err);
    });
};


export default formResetPasswordSlice.reducer;
