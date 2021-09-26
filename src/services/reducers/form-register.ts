import {
  FORM_REGISTER_SET_VALUE,
  FORM_REGISTER_CLEAR_FORM
} from '../constants/action-types';
import {
  TFormRegisterActions
} from '../actions/form-register';


type TState = {
  form: {
    email: string;
    password: string;
    name: string;
  }
}

const initialState: TState = {
  form: {
    email: "",
    password: "",
    name: "",
  }
}


const formRegisterReducer = (state = initialState, action: TFormRegisterActions): TState => {
  switch (action.type) {

    case (FORM_REGISTER_SET_VALUE): {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        }
      }
    }

    case (FORM_REGISTER_CLEAR_FORM): {
      return initialState
    }

    default: {
      return state;
    }
  }
};


export default formRegisterReducer;
