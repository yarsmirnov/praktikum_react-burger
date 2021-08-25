import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  VERIFY_EMAIL_REQUEST: false,
  VERIFY_EMAIL_SUCCESS: false,
  VERIFY_EMAIL_FAILURE: false,

  form: {
    email: '',
  }
};

const forgotPasswordApi = 'https://norma.nomoreparties.space/api/password-reset';

export const formForgotPasswordSlice = createSlice({
  name: 'formForgotPassword',
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
      VERIFY_EMAIL_REQUEST: true,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,
      form: {...state.form},
    }),

    success: (state) => ({
      ...state,
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: true,
      VERIFY_EMAIL_FAILURE: false,
      form: {...initialState.form},
    }),

    failure: (state) => ({
      ...state,
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: true,
      form: {...state.form},
    }),
  },
});


export const {
  setValue,
  resetForm,
  request,
  success,
  failure
} = formForgotPasswordSlice.actions;


export const verifyEmail = () => async (dispatch, getState) => {
  const data = getState().formForgotPassword.form;
  dispatch(request());

  fetch(forgotPasswordApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(failure());
      throw new Error('Failed verify email request');
    })
    .then(data => {
      if (data.success) {
        dispatch(success());
      } else {
        dispatch(failure());
      }
      return data;
    })
    .catch(err => {
      dispatch(failure());
      console.log(err)
    });
};


export default formForgotPasswordSlice.reducer;
