import {
  FORM_PROFILE_SET_INITIAL_VALUE,
  FORM_PROFILE_SET_VALUE,
  FORM_PROFILE_RESET_FORM,
  FORM_PROFILE_CLEAR_FORM
} from '../constants/action-types';


type TSetFormPayload = {
  email: string;
  name: string;
  password?: string;
}

type TFormSetData = { name: string; value: string; }

// Action types
export type TSetInitialValueAction = {
  readonly type: typeof FORM_PROFILE_SET_INITIAL_VALUE;
  readonly payload: TSetFormPayload;
}
export type TSetValueAction = {
  readonly type: typeof FORM_PROFILE_SET_VALUE;
  readonly payload: TFormSetData;
}
export type TResetFormAction = {
  readonly type: typeof FORM_PROFILE_RESET_FORM;
}
export type TClearFormAction = {
  readonly type: typeof FORM_PROFILE_CLEAR_FORM;
}


// All types
export type TFormProfileActions =
  | TSetInitialValueAction
  | TSetValueAction
  | TResetFormAction
  | TClearFormAction;


// Action creators
export const setInitialValueAction =
  (payload: TSetFormPayload): TSetInitialValueAction => ({
    type: FORM_PROFILE_SET_INITIAL_VALUE,
    payload,
  });

export const setValueAction =
  (payload: TFormSetData): TSetValueAction => ({
    type: FORM_PROFILE_SET_VALUE,
    payload,
  });

export const resetFormAction =
  (): TResetFormAction => ({
    type: FORM_PROFILE_RESET_FORM,
  });

export const clearFormAction =
  (): TClearFormAction => ({
    type: FORM_PROFILE_CLEAR_FORM,
  });
