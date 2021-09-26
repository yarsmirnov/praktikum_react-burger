import {
  FORM_FORGOT_PASSWORD_SET_VALUE,
  FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL,
  FORM_FORGOT_PASSWORD_CLEAR_FORM,
  FORM_FORGOT_PASSWORD_REQUEST,
  FORM_FORGOT_PASSWORD_SUCCESS,
  FORM_FORGOT_PASSWORD_FAILURE,
} from '../constants/action-types';
import { forgotPasswordRequest } from '../api';


type TFormSetData = { name: string; value: string; }

// Action types
export type TSetValueAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_SET_VALUE;
  readonly payload: TFormSetData;
}
export type TSetVerifiedEmailAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL;
  readonly payload: string | null;
}
export type TClearFormAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_CLEAR_FORM;
}
export type TRequestAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_REQUEST;
}
export type TSuccessAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_SUCCESS;
}
export type TFailureAction = {
  readonly type: typeof FORM_FORGOT_PASSWORD_FAILURE;
}


// All types
export type TFormForgotPasswordActions =
  | TSetValueAction
  | TSetVerifiedEmailAction
  | TClearFormAction
  | TRequestAction
  | TSuccessAction
  | TFailureAction;


// Action creators
export const setValueAction =
  (payload: TFormSetData): TSetValueAction => ({
    type: FORM_FORGOT_PASSWORD_SET_VALUE,
    payload,
  });

export const setVerifiedEmailAction =
  (verifiedEmail: string | null): TSetVerifiedEmailAction => ({
    type: FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL,
    payload: verifiedEmail,
  });

export const clearFormAction =
  (): TClearFormAction => ({
    type: FORM_FORGOT_PASSWORD_CLEAR_FORM,
  });

export const requestAction =
  (): TRequestAction => ({
    type: FORM_FORGOT_PASSWORD_REQUEST,
  });

export const successAction =
  (): TSuccessAction => ({
    type: FORM_FORGOT_PASSWORD_SUCCESS,
  });

  export const failureAction =
  (): TFailureAction => ({
    type: FORM_FORGOT_PASSWORD_FAILURE,
  });


// Async actions
export const verifyEmailAction = () => async (dispatch, getState) => {
  const formData = getState().formForgotPassword.form;

  dispatch(requestAction());
  dispatch(setVerifiedEmailAction(null));

  await forgotPasswordRequest(formData)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed verify email request');
    })
    .then(data => {
      if (data.success) {
        dispatch(successAction());
        dispatch(setVerifiedEmailAction(formData.email));
      } else {
        throw new Error('Unsuccessful verify email request');
      }
      return data;
    })
    .catch(err => {
      dispatch(failureAction());
      console.error(err);
    });
};
