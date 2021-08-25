import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  RESET_PASSWORD_REQUEST: false,
  RESET_PASSWORD_SUCCESS: false,
  RESET_PASSWORD_FAILURE: false,

  form: {
    password: '',
    token: '',
  }
};

const resetPasswordApi = 'https://norma.nomoreparties.space/api/password-reset/reset';

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

    resetForm: () => initialState,

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
  resetForm,
  request,
  success,
  failure
} = formResetPasswordSlice.actions;


export const resetPassword = () => async (dispatch, getState) => {
  const data = getState().form;
  dispatch(request());

  fetch(resetPasswordApi, {
    nethod: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      dispatch(failure());
      throw new Error('Failed reset password request');
    })
    .then(data => {
      if (data.success) {
        console.log(data);
        dispatch(success());
      } else {
        dispatch(failure());
      }
      return data;
    })
    .catch(err => {
      dispatch(failure());
      console.error(err);
    });
};


export default formResetPasswordSlice.reducer;
