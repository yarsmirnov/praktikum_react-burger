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
import {
  refreshTokenRequest,
  registerUserRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  patchUserRequest
} from '../api';
import {
  setCookie,
  deleteCookie
} from '../../utils/cookie';
import { AppThunk, AppDispatch } from '../types';


export type TUser = null | {
  email: string;
  name: string;
}

// Action types
export type TSetUserAction = {
  readonly type: typeof USER_SET_USER;
  readonly payload: TUser;
}
export type TSetRegisterRequestAction = {
  readonly type: typeof USER_SET_REGISTER_REQUEST;
}
export type TSetRegisterSuccessAction = {
  readonly type: typeof USER_SET_REGISTER_SUCCESS;
}
export type TSetRegisterFailureAction = {
  readonly type: typeof USER_SET_REGISTER_FAILURE;
}
export type TSetLoginRequestAction = {
  readonly type: typeof USER_SET_LOGIN_REQUEST;
}
export type TSetLoginSuccessAction = {
  readonly type: typeof USER_SET_LOGIN_SUCCESS;
}
export type TSetLoginFailureAction = {
  readonly type: typeof USER_SET_LOGIN_FAILURE;
}
export type TSetLogoutRequestAction = {
  readonly type: typeof USER_SET_LOGOUT_REQUEST;
}
export type TSetLogoutSuccessAction = {
  readonly type: typeof USER_SET_LOGOUT_SUCCESS;
}
export type TSetLogoutFailureAction = {
  readonly type: typeof USER_SET_LOGOUT_FAILURE;
}
export type TSetGetUserRequestAction = {
  readonly type: typeof USER_SET_GET_USER_REQUEST;
}
export type TSetGetUserSuccessAction = {
  readonly type: typeof USER_SET_GET_USER_SUCCESS;
}
export type TSetGetUserFailureAction = {
  readonly type: typeof USER_SET_GET_USER_FAILURE;
}
export type TSetPatchUserRequestAction = {
  readonly type: typeof USER_SET_PATCH_USER_REQUEST;
}
export type TSetPatchUserSuccessAction = {
  readonly type: typeof USER_SET_PATCH_USER_SUCCESS;
}
export type TSetPatchUserFailureAction = {
  readonly type: typeof USER_SET_PATCH_USER_FAILURE;
}


// All types
export type TUserActions =
  | TSetUserAction
  | TSetRegisterRequestAction
  | TSetRegisterSuccessAction
  | TSetRegisterFailureAction
  | TSetLoginRequestAction
  | TSetLoginSuccessAction
  | TSetLoginFailureAction
  | TSetLogoutRequestAction
  | TSetLogoutSuccessAction
  | TSetLogoutFailureAction
  | TSetGetUserRequestAction
  | TSetGetUserSuccessAction
  | TSetGetUserFailureAction
  | TSetPatchUserRequestAction
  | TSetPatchUserSuccessAction
  | TSetPatchUserFailureAction;


// Action creators
export const setUserAction =
  (user: TUser): TSetUserAction => ({
    type: USER_SET_USER,
    payload: user,
  });

export const setRegisterRequestAction =
  (): TSetRegisterRequestAction => ({
    type: USER_SET_REGISTER_REQUEST,
  });

export const setRegisterSuccessAction =
  (): TSetRegisterSuccessAction => ({
    type: USER_SET_REGISTER_SUCCESS,
  });

export const setRegisterFailureAction =
  (): TSetRegisterFailureAction => ({
    type: USER_SET_REGISTER_FAILURE,
  });

export const setLoginRequestAction =
  (): TSetLoginRequestAction => ({
    type: USER_SET_LOGIN_REQUEST,
  });

export const setLoginSuccessAction =
  (): TSetLoginSuccessAction => ({
    type: USER_SET_LOGIN_SUCCESS,
  });

export const setLoginFailureAction =
  (): TSetLoginFailureAction => ({
    type: USER_SET_LOGIN_FAILURE,
  });

export const setLogoutRequestAction =
  (): TSetLogoutRequestAction => ({
    type: USER_SET_LOGOUT_REQUEST,
  });

export const setLogoutSuccessAction =
  (): TSetLogoutSuccessAction => ({
    type: USER_SET_LOGOUT_SUCCESS,
  });

export const setLogoutFailureAction =
  (): TSetLogoutFailureAction => ({
    type: USER_SET_LOGOUT_FAILURE,
  });

export const setGetUserRequestAction =
  (): TSetGetUserRequestAction => ({
    type: USER_SET_GET_USER_REQUEST,
  });

export const setGetUserSuccessAction =
  (): TSetGetUserSuccessAction => ({
    type: USER_SET_GET_USER_SUCCESS,
  });

export const setGetUserFailureAction =
  (): TSetGetUserFailureAction => ({
    type: USER_SET_GET_USER_FAILURE,
  });

export const setPatchUserRequestAction =
  (): TSetPatchUserRequestAction => ({
    type: USER_SET_PATCH_USER_REQUEST,
  });

export const setPatchUserSuccessAction =
  (): TSetPatchUserSuccessAction => ({
    type: USER_SET_PATCH_USER_SUCCESS,
  });

export const setPatchUserFailureAction =
  (): TSetPatchUserFailureAction => ({
    type: USER_SET_PATCH_USER_FAILURE,
  });


// Async actions
export const refreshToken: AppThunk = (afterRefresh) => async (dispatch: AppDispatch | AppThunk) => {
  await refreshTokenRequest()
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(afterRefresh);
    })
    .catch(err => { throw err });
};

export const registerUser = (form) => async (dispatch) => {
  await registerUserRequest(form)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed register user request');
  })
  .then(data => {
    if (data.success) {
      const accessToken = data.accessToken.split('Bearer ')[1];

      dispatch(setUserAction(data.user));
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(setRegisterSuccessAction());
      return data;
    }
    throw new Error('Unsuccessful login request');
  })
  .catch(err => {
    dispatch(setRegisterFailureAction());
    console.error(err);
  });
}

export const loadUserData: AppThunk = () => async (dispatch: AppDispatch | AppThunk) => {
  dispatch(setGetUserRequestAction());

  await getUserRequest()
    .then((res) => {
      if (!res.ok && !(res.status === 403)) {
        throw new Error('Failed get user request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;
      dispatch(setUserAction(data.user));
      dispatch(setGetUserSuccessAction());
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(loadUserData()));
      } else {
        dispatch(setUserAction(null));
        dispatch(setGetUserFailureAction());
        console.error(err);
      }
    });
};

export const patchUserData: AppThunk = (form) => async (dispatch: AppDispatch | AppThunk) => {
  dispatch(setPatchUserRequestAction());

  await patchUserRequest(form)
    .then(res => {
      if (!res.ok && !(res.status === 403)) {
        throw new Error('Failed get user request');
      };
      return res.json();
    })
    .then(data => {
      if (!data.success) throw data;

      dispatch(setUserAction(data.user));
      dispatch(setPatchUserSuccessAction());
      return data;
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(patchUserData(form)));
      } else {
        dispatch(setPatchUserFailureAction());
        console.error(err);
      }
    });
};

export const loginUser: AppThunk = (form) => async (dispatch: AppDispatch | AppThunk) => {
  dispatch(setLoginRequestAction());

  await loginRequest(form)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed login request');
    })
    .then(data => {
      if (data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];

        dispatch(setUserAction(data.user));
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch(setLoginSuccessAction());
        return data;
      }
      throw new Error('Unsuccessful login request');
    })
    .catch(err => {
      dispatch(setLoginFailureAction());
      console.error(err);
    });
};

export const logoutUser: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(setLogoutRequestAction());

  await logoutRequest()
    .then(res => {
      if (res.ok) {
        dispatch(setUserAction(null));
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLogoutSuccessAction());
      }
    })
    .catch(err => {
      dispatch(setLogoutFailureAction());
      console.error(err);
    });
};
