import {
  FORM_RESET_PASSWORD_SET_VALUE,
  FORM_RESET_PASSWORD_CLEAR_FORM,
  FORM_RESET_PASSWORD_REQUEST,
  FORM_RESET_PASSWORD_SUCCESS,
  FORM_RESET_PASSWORD_FAILURE,
} from '../constants/action-types';
import {
  TFormResetPasswordActions
} from '../actions/form-reset-password';
import { TUserResetPasswordForm } from '../types/api';


type TState = {
  RESET_PASSWORD_REQUEST: boolean;
  RESET_PASSWORD_SUCCESS: boolean;
  RESET_PASSWORD_FAILURE: boolean;

  form: TUserResetPasswordForm
}

export const initialState: TState = {
  RESET_PASSWORD_REQUEST: false,
  RESET_PASSWORD_SUCCESS: false,
  RESET_PASSWORD_FAILURE: false,

  form: {
    password: '',
    token: '',
  }
}


const formResetPasswordReducer = (state = initialState, action: TFormResetPasswordActions): TState => {
  switch (action.type) {

    case (FORM_RESET_PASSWORD_SET_VALUE): {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        }
      }
    }

    case (FORM_RESET_PASSWORD_CLEAR_FORM): {
      return initialState
    }

    case (FORM_RESET_PASSWORD_REQUEST): {
      return {
        ...state,
        RESET_PASSWORD_REQUEST: true,
        RESET_PASSWORD_SUCCESS: false,
        RESET_PASSWORD_FAILURE: false,
        form: {...state.form},
      }
    }

    case (FORM_RESET_PASSWORD_SUCCESS): {
      return {
        ...state,
        RESET_PASSWORD_REQUEST: false,
        RESET_PASSWORD_SUCCESS: true,
        RESET_PASSWORD_FAILURE: false,
        form: {...initialState.form},
      }
    }

    case (FORM_RESET_PASSWORD_FAILURE): {
      return {
        ...state,
        RESET_PASSWORD_REQUEST: false,
        RESET_PASSWORD_SUCCESS: false,
        RESET_PASSWORD_FAILURE: true,
        form: {...state.form},
      }
    }

    default: {
      return state
    }
  }
}


export default formResetPasswordReducer;
