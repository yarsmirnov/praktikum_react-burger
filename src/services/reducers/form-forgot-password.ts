import {
  FORM_FORGOT_PASSWORD_SET_VALUE,
  FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL,
  FORM_FORGOT_PASSWORD_CLEAR_FORM,
  FORM_FORGOT_PASSWORD_REQUEST,
  FORM_FORGOT_PASSWORD_SUCCESS,
  FORM_FORGOT_PASSWORD_FAILURE,
} from '../constants/action-types';
import { TFormForgotPasswordActions } from '../actions/form-forgot-password';
import { TUserForgotPasswordForm } from '../types/api';

export type TState = {
  VERIFY_EMAIL_REQUEST: boolean;
  VERIFY_EMAIL_SUCCESS: boolean;
  VERIFY_EMAIL_FAILURE: boolean;

  verifiedEmail: string | null;

  form: TUserForgotPasswordForm;
}

export const initialState: TState = {
  VERIFY_EMAIL_REQUEST: false,
  VERIFY_EMAIL_SUCCESS: false,
  VERIFY_EMAIL_FAILURE: false,

  verifiedEmail: null,

  form: {
    email: '',
  }
};


const formForgotPasswordReducer = (state = initialState, action: TFormForgotPasswordActions): TState => {
  switch (action.type) {

    case FORM_FORGOT_PASSWORD_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        }
      }
    }

    case FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL: {
      return {
        ...state,
        verifiedEmail: action.payload,
        form: {...state.form},
      }
    }

    case FORM_FORGOT_PASSWORD_CLEAR_FORM: {
      return {
        ...initialState,
        verifiedEmail: state.verifiedEmail,
      }
    }

    case FORM_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        VERIFY_EMAIL_REQUEST: true,
        VERIFY_EMAIL_SUCCESS: false,
        VERIFY_EMAIL_FAILURE: false,
        form: {...state.form},
      }
    }

    case FORM_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        VERIFY_EMAIL_REQUEST: false,
        VERIFY_EMAIL_SUCCESS: true,
        VERIFY_EMAIL_FAILURE: false,
        form: {...state.form},
      }
    }

    case FORM_FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        VERIFY_EMAIL_REQUEST: false,
        VERIFY_EMAIL_SUCCESS: false,
        VERIFY_EMAIL_FAILURE: true,
        form: {...state.form},
      }
    }

    default: {
      return state;
    }
  }
};


export default formForgotPasswordReducer;
