import { createSlice } from '@reduxjs/toolkit';
import { forgotPasswordRequest } from '../api';


const initialState = {
  VERIFY_EMAIL_REQUEST: false,
  VERIFY_EMAIL_SUCCESS: false,
  VERIFY_EMAIL_FAILURE: false,

  verifiedEmail: null,

  form: {
    email: '',
  }
};


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

    setVerifiedEmail: (state, action) => ({
      ...state,
      verifiedEmail: action.payload,
      form: {...state.form},
    }),

    clearForm: (state) => ({
      ...initialState,
      verifiedEmail: state.verifiedEmail,
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
  setVerifiedEmail,
  clearForm,
  request,
  success,
  failure
} = formForgotPasswordSlice.actions;


export const verifyEmail = () => async (dispatch, getState) => {
  const formData = getState().formForgotPassword.form;

  dispatch(request());
  dispatch(setVerifiedEmail(null));

  forgotPasswordRequest(formData)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed verify email request');
    })
    .then(data => {
      if (data.success) {
        dispatch(success());
        dispatch(setVerifiedEmail(formData.email));
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
