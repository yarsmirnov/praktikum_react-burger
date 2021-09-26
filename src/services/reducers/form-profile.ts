import {
  FORM_PROFILE_SET_INITIAL_VALUE,
  FORM_PROFILE_SET_VALUE,
  FORM_PROFILE_RESET_FORM,
  FORM_PROFILE_CLEAR_FORM
} from '../constants/action-types';
import {
  TFormProfileActions
} from '../actions/form-profile';


type TState = {
  initialForm: {
    email: string;
    password: string;
    name: string;
  },
  form: {
    email: string;
    password: string;
    name: string;
  },
}

export const initialState: TState = {
  initialForm: {
    email: '',
    password: '',
    name: '',
  },

  form: {
    email: '',
    password: '',
    name: '',
  },
};


const formProfileReducer = (state = initialState, action: TFormProfileActions): TState => {
  switch (action.type) {

    case (FORM_PROFILE_SET_INITIAL_VALUE): {
      return {
        ...state,
        initialForm: {...state.initialForm, ...action.payload},
        form: {...state.initialForm, ...action.payload},
      }
    }

    case (FORM_PROFILE_SET_VALUE): {
      return {
        ...state,
        initialForm: {...state.initialForm},
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        }
      }
    }

    case (FORM_PROFILE_RESET_FORM): {
      return {
        ...state,
        initialForm: {...state.initialForm},
        form: {...state.initialForm},
      }
    }

    case (FORM_PROFILE_CLEAR_FORM): {
      return initialState
    }

    default: {
      return state
    }
  }
}


export default formProfileReducer;
