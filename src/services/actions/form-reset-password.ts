import {
  FORM_RESET_PASSWORD_SET_VALUE,
  FORM_RESET_PASSWORD_CLEAR_FORM,
  FORM_RESET_PASSWORD_REQUEST,
  FORM_RESET_PASSWORD_SUCCESS,
  FORM_RESET_PASSWORD_FAILURE,
} from '../constants/action-types';
import { resetPasswordRequest } from '../api';
import { AppThunk } from '../types';


type TFormSetData = { name: string; value: string; }

// Action types
export type TSetValueAction = {
  readonly type: typeof FORM_RESET_PASSWORD_SET_VALUE;
  readonly payload: TFormSetData;
}
export type TClearFormAction = {
  readonly type: typeof FORM_RESET_PASSWORD_CLEAR_FORM;
}
export type TRequestAction = {
  readonly type: typeof FORM_RESET_PASSWORD_REQUEST;
}
export type TSuccessAction = {
  readonly type: typeof FORM_RESET_PASSWORD_SUCCESS;
}
export type TFailureAction = {
  readonly type: typeof FORM_RESET_PASSWORD_FAILURE;
}


// All types
export type TFormResetPasswordActions =
  | TSetValueAction
  | TClearFormAction
  | TRequestAction
  | TSuccessAction
  | TFailureAction;


// Action creators
export const setValueAction =
  (payload: TFormSetData): TSetValueAction => ({
    type: FORM_RESET_PASSWORD_SET_VALUE,
    payload,
  });

export const clearFormAction =
  (): TClearFormAction => ({
    type: FORM_RESET_PASSWORD_CLEAR_FORM,
  });

export const requestAction =
  (): TRequestAction => ({
    type: FORM_RESET_PASSWORD_REQUEST,
});

export const successAction =
  (): TSuccessAction => ({
    type: FORM_RESET_PASSWORD_SUCCESS,
});

export const failureAction =
  (): TFailureAction => ({
    type: FORM_RESET_PASSWORD_FAILURE,
  });


// Async actions
export const resetPasswordAction: AppThunk =
  () => async (dispatch, getState) => {
    const formData = getState().formResetPassword.form;

    dispatch(requestAction());

    await resetPasswordRequest(formData)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        dispatch(failureAction());
        throw new Error('Failed reset password request');
      })
      .then(data => {
        if (data.success) {
          dispatch(successAction());
        }
        return data;
      })
      .catch(err => {
        dispatch(failureAction());
        console.error(err);
      });
  };
