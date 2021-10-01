import {
  FORM_LOGIN_SET_VALUE,
  FORM_LOGIN_CLEAR_FORM
} from '../constants/action-types';


type TFormSetData = { name: string; value: string; }

// Action types
export type TSetValueAction = {
  readonly type: typeof FORM_LOGIN_SET_VALUE;
  readonly payload: TFormSetData;
}
export type TClearFormAction = {
  readonly type: typeof FORM_LOGIN_CLEAR_FORM;
}


// All types
export type TFormLoginActions =
  | TSetValueAction
  | TClearFormAction;


// Action creators
export const setValueAction =
  (payload: TFormSetData): TSetValueAction => ({
    type: FORM_LOGIN_SET_VALUE,
    payload
  });

export const clearFormAction =
  (): TClearFormAction => ({
    type: FORM_LOGIN_CLEAR_FORM,
  });
