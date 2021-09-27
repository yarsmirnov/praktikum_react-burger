import {
  USER_SET_USER,

  USER_SET_REGISTER_REQUEST,
  USER_SET_REGISTER_SUCCESS,
  USER_SET_REGISTER_FAILURE,

  USER_SET_LOGIN_REQUEST,
  USER_SET_LOGIN_SUCCESS,
  USER_SET_LOGIN_FAILURE,

  USER_SET_LOGOUT_REQUEST,
  USER_SET_LOGOUT_SUCCESS,
  USER_SET_LOGOUT_FAILURE,

  USER_SET_GET_USER_REQUEST,
  USER_SET_GET_USER_SUCCESS,
  USER_SET_GET_USER_FAILURE,

  USER_SET_PATCH_USER_REQUEST,
  USER_SET_PATCH_USER_SUCCESS,
  USER_SET_PATCH_USER_FAILURE
} from '../constants/action-types';
import { TUser, TUserActions } from '../actions/user';


type TState = {
  user: TUser;

  REGISTER_REQUEST: boolean;
  REGISTER_SUCCESS: boolean;
  REGISTER_FAILURE: boolean;

  LOGIN_REQUEST: boolean;
  LOGIN_SUCCESS: boolean;
  LOGIN_FAILURE: boolean;

  LOGOUT_REQUEST: boolean;
  LOGOUT_SUCCESS: boolean;
  LOGOUT_FAILURE: boolean;

  GET_USER_REQUEST: boolean;
  GET_USER_SUCCESS: boolean;
  GET_USER_FAILURE: boolean;

  PATCH_USER_REQUEST: boolean;
  PATCH_USER_SUCCESS: boolean;
  PATCH_USER_FAILURE: boolean;
}

export const initialState: TState = {
  user: null,

  REGISTER_REQUEST: false,
  REGISTER_SUCCESS: false,
  REGISTER_FAILURE: false,

  LOGIN_REQUEST: false,
  LOGIN_SUCCESS: false,
  LOGIN_FAILURE: false,

  LOGOUT_REQUEST: false,
  LOGOUT_SUCCESS: false,
  LOGOUT_FAILURE: false,

  GET_USER_REQUEST: false,
  GET_USER_SUCCESS: false,
  GET_USER_FAILURE: false,

  PATCH_USER_REQUEST: false,
  PATCH_USER_SUCCESS: false,
  PATCH_USER_FAILURE: false,
};


const userReducer = (state = initialState, action: TUserActions): TState => {
  switch (action.type) {

    case (USER_SET_USER): {
      return {
        ...state,
        user: action.payload,
      }
    }

    case (USER_SET_REGISTER_REQUEST): {
      return {
        ...state,
        REGISTER_REQUEST: true,
        REGISTER_SUCCESS: false,
        REGISTER_FAILURE: false,
        user: null,
      }
    }

    case (USER_SET_REGISTER_SUCCESS): {
      return {
        ...state,
        REGISTER_REQUEST: false,
        REGISTER_SUCCESS: true,
        REGISTER_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_REGISTER_FAILURE): {
      return {
        ...state,
        REGISTER_REQUEST: false,
        REGISTER_SUCCESS: false,
        REGISTER_FAILURE: true,
        user: null,
      }
    }

    case (USER_SET_LOGIN_REQUEST): {
      return {
        ...state,
        LOGIN_REQUEST: true,
        LOGIN_SUCCESS: false,
        LOGIN_FAILURE: false,
        user: null,
      }
    }

    case (USER_SET_LOGIN_SUCCESS): {
      return {
        ...state,
        LOGIN_REQUEST: false,
        LOGIN_SUCCESS: true,
        LOGIN_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_LOGIN_FAILURE): {
      return {
        ...state,
        LOGIN_REQUEST: false,
        LOGIN_SUCCESS: false,
        LOGIN_FAILURE: true,
        user: null,
      }
    }

    case (USER_SET_LOGOUT_REQUEST): {
      return {
        ...state,
        LOGOUT_REQUEST: true,
        LOGOUT_SUCCESS: false,
        LOGOUT_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_LOGOUT_SUCCESS): {
      return {
        ...state,
        LOGOUT_REQUEST: false,
        LOGOUT_SUCCESS: true,
        LOGOUT_FAILURE: false,
        user: null,
      }
    }

    case (USER_SET_LOGOUT_FAILURE): {
      return {
        ...state,
        LOGOUT_REQUEST: false,
        LOGOUT_SUCCESS: false,
        LOGOUT_FAILURE: true,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_GET_USER_REQUEST): {
      return {
        ...state,
        GET_USER_REQUEST: true,
        GET_USER_SUCCESS: false,
        GET_USER_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_GET_USER_SUCCESS): {
      return {
        ...state,
        GET_USER_REQUEST: false,
        GET_USER_SUCCESS: true,
        GET_USER_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_GET_USER_FAILURE): {
      return {
        ...state,
        GET_USER_REQUEST: false,
        GET_USER_SUCCESS: false,
        GET_USER_FAILURE: true,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_PATCH_USER_REQUEST): {
      return {
        ...state,
        PATCH_USER_REQUEST: true,
        PATCH_USER_SUCCESS: false,
        PATCH_USER_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_PATCH_USER_SUCCESS): {
      return {
        ...state,
        PATCH_USER_REQUEST: false,
        PATCH_USER_SUCCESS: true,
        PATCH_USER_FAILURE: false,
        user: state.user ? {...state.user} : null,
      }
    }

    case (USER_SET_PATCH_USER_FAILURE): {
      return {
        ...state,
        PATCH_USER_REQUEST: false,
        PATCH_USER_SUCCESS: false,
        PATCH_USER_FAILURE: true,
        user: state.user ? {...state.user} : null,
      }
    }

    default: {
      return state
    }
  }
};


export default userReducer;
