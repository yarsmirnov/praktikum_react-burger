import {
  FORM_LOGIN_SET_VALUE,
  FORM_LOGIN_CLEAR_FORM
} from '../constants/action-types';
import { TFormLoginActions } from '../actions/form-login';

type TState = {
  form: {
    email: string,
    password: string,
  }
}

export const initialState: TState = {
  form: {
    email: "",
    password: "",
  }
};

const formLoginReducer = (state = initialState, action: TFormLoginActions): TState => {
  switch (action.type) {

    case FORM_LOGIN_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        }
      }
    }

    case FORM_LOGIN_CLEAR_FORM: {
      return initialState
    }

    default: {
      return state
    }
  }
}


export default formLoginReducer;
