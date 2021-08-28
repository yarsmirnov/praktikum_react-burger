import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  VERIFY_EMAIL_REQUEST: false,
  VERIFY_EMAIL_SUCCESS: false,
  VERIFY_EMAIL_FAILURE: false,

  sentEmail: null,

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

    setSentEmail: (state, action) => ({
      ...state,
      sentEmail: action.payload,
      form: {...state.form},
    }),

    clearForm: (state) => ({
      ...initialState,
      sentEmail: state.form.email,
    }),

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
      form: {...state.form},
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
  setSentEmail,
  clearForm,
  request,
  success,
  failure
} = formForgotPasswordSlice.actions;


export const verifyEmail = () => async (dispatch, getState) => {
  const form = getState().formForgotPassword.form;

  dispatch(request());
  dispatch(setSentEmail(null));

  fetch(forgotPasswordApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(form),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed verify email request');
    })
    .then(data => {
      if (data.success) {
        dispatch(success());
        dispatch(setSentEmail(form.email));
      } else {
        throw new Error('Unsuccessful verify email request');
      }
      return data;
    })
    .catch(err => {
      dispatch(failure());
      console.error(err);
    });
};


export default formForgotPasswordSlice.reducer;
