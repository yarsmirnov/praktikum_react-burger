import {
  FORM_REGISTER_SET_VALUE,
  FORM_REGISTER_CLEAR_FORM
} from '../constants/action-types';


type TFormSetData = { name: string; value: string; }

// Action types
export type TSetValueAction = {
  readonly type: typeof FORM_REGISTER_SET_VALUE;
  readonly payload: TFormSetData;
}
export type TClearFormAction = {
  readonly type: typeof FORM_REGISTER_CLEAR_FORM;
}


// All types
export type TFormRegisterActions =
  | TSetValueAction
  | TClearFormAction;


// Action creators
export const setValueAction =
  (payload: TFormSetData): TSetValueAction => ({
    type: FORM_REGISTER_SET_VALUE,
    payload,
  });
export const clearFormAction =
  (): TClearFormAction => ({
    type: FORM_REGISTER_CLEAR_FORM,
  });
