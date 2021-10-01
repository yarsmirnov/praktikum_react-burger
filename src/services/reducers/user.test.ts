import reducer from './user';
import {
  setUserAction,

  setRegisterRequestAction,
  setRegisterSuccessAction,
  setRegisterFailureAction,

  setLoginRequestAction,
  setLoginSuccessAction,
  setLoginFailureAction,

  setLogoutRequestAction,
  setLogoutSuccessAction,
  setLogoutFailureAction,

  setGetUserRequestAction,
  setGetUserSuccessAction,
  setGetUserFailureAction,

  setPatchUserRequestAction,
  setPatchUserSuccessAction,
  setPatchUserFailureAction,

  refreshToken,
  registerUser,
  loadUserData,
  patchUserData,
  loginUser,
  logoutUser
} from '../actions/user';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './user';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = { email: 'example@mail.com', name: 'Some Name' };


describe('Test user reducer', () => {
  it('setUser() should set user', () => {
    const initial = {
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

      user: null,
    };
    const payload = {
      email: 'example@mail.com',
      name: 'Some Name'
    };

    const expected = {
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

      user: payload,
    };

    expect(reducer(initial, setUserAction(payload)))
      .toEqual(expected);
  })

  it('setRegisterRequest() should set correct request status and reset user to null', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
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

      user,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: true,

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

      user: null,
    };

    const expeted = {
      REGISTER_REQUEST: true,
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

      user: null,
    };

    expect(reducer(initial1, setRegisterRequestAction()))
      .toEqual(expeted);
    expect(reducer(initial2, setRegisterRequestAction()))
      .toEqual(expeted);
    expect(reducer(initial3, setRegisterRequestAction()))
      .toEqual(expeted);
  })

  it('setRegisterSuccess() should set correct request status and set user to null', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: true,
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

      user,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: true,

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

      user: null,
    };

    const expected1 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
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

      user: null,
    };
    const expected2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
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

      user,
    };
    const expected3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
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

      user: null,
    };

    expect(reducer(initial1, setRegisterSuccessAction()))
      .toEqual(expected1);
    expect(reducer(initial2, setRegisterSuccessAction()))
      .toEqual(expected2);
    expect(reducer(initial3, setRegisterSuccessAction()))
      .toEqual(expected3);
  })

  it('setRegisterFailure() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: true,
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

      user: null,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: true,
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

      user,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: true,

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

      user: null,
    };

    expect(reducer(initial1, setRegisterFailureAction()))
      .toEqual(expected);
    expect(reducer(initial2, setRegisterFailureAction()))
      .toEqual(expected);
    expect(reducer(initial3, setRegisterFailureAction()))
      .toEqual(expected);
  })

  it('setLoginRequest() should set correct request status and user', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
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

      user,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: true,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: true,
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

      user: null,
    };

    expect(reducer(initial1, setLoginRequestAction()))
      .toEqual(expected);
    expect(reducer(initial2, setLoginRequestAction()))
      .toEqual(expected);
    expect(reducer(initial3, setLoginRequestAction()))
      .toEqual(expected);
  })

  it('setLoginSuccess() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: true,
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

      user,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: true,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected1 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
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

      user: null,
    };
    const expected2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
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

      user,
    };
    const expected3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
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

      user: null,
    };

    expect(reducer(initial1, setLoginSuccessAction()))
      .toEqual(expected1);
    expect(reducer(initial2, setLoginSuccessAction()))
      .toEqual(expected2);
    expect(reducer(initial3, setLoginSuccessAction()))
      .toEqual(expected3);
  })

  it('setLoginFailure() should set correct request status and set user as null', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: true,
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

      user: null,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: true,
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

      user,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: true,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    expect(reducer(initial1, setLoginFailureAction()))
      .toEqual(expected);
    expect(reducer(initial2, setLoginFailureAction()))
      .toEqual(expected);
    expect(reducer(initial3, setLoginFailureAction()))
      .toEqual(expected);
  })

  it('setLogoutRequest() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: true,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: true,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };
    const expected3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: true,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    expect(reducer(initial1, setLogoutRequestAction()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutRequestAction()))
      .toEqual(expected);
    expect(reducer(initial3, setLogoutRequestAction()))
      .toEqual(expected3);
  })

  it('setLogoutSuccess() should set correct request status and set user to null', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: true,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: true,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    expect(reducer(initial1, setLogoutSuccessAction()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutSuccessAction()))
      .toEqual(expected);
    expect(reducer(initial3, setLogoutSuccessAction()))
      .toEqual(expected);
  })

  it('setLogoutFailure() should set correct request status', () => {
    const initial1 =  {
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

      user: null,
    };
    const initial2 =  {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: true,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 =  {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: true,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    expect(reducer(initial1, setLogoutFailureAction()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutFailureAction()))
      .toEqual(expected2);
    expect(reducer(initial3, setLogoutFailureAction()))
      .toEqual(expected);
  })

  it('setGetUserRequest() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
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
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      GET_USER_FAILURE: true,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };
    const expected2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    expect(reducer(initial1, setGetUserRequestAction()))
      .toEqual(expected);
    expect(reducer(initial2, setGetUserRequestAction()))
      .toEqual(expected2);
    expect(reducer(initial3, setGetUserRequestAction()))
      .toEqual(expected);
  })

  it('setGetUserSuccess() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      GET_USER_FAILURE: true,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected = {
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
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };
    const expected2 = {
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
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    expect(reducer(initial1, setGetUserSuccessAction()))
      .toEqual(expected);
    expect(reducer(initial2, setGetUserSuccessAction()))
      .toEqual(expected2);
    expect(reducer(initial3, setGetUserSuccessAction()))
      .toEqual(expected);
  })

  it('setGetUserFailure() should set correct request status', () => {
    const initial1 = {
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

      user: null,
    };
    const initial2 = {
      REGISTER_REQUEST: false,
      REGISTER_SUCCESS: false,
      REGISTER_FAILURE: false,

      LOGIN_REQUEST: false,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: false,

      GET_USER_REQUEST: true,
      GET_USER_SUCCESS: false,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    const expected1 = {
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
      GET_USER_FAILURE: true,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };
    const expected = {
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
      GET_USER_FAILURE: true,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };

    expect(reducer(initial1, setGetUserFailureAction()))
      .toEqual(expected1);
    expect(reducer(initial2, setGetUserFailureAction()))
      .toEqual(expected);
    expect(reducer(initial3, setGetUserFailureAction()))
      .toEqual(expected);
  })

  it('setPatchUserRequest() should set correct request status', () => {
    const initial1 = {
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

      user,
    };
    const initial2 = {
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
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      PATCH_USER_FAILURE: true,

      user: null,
    };

    const expected = {
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

      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const expected3 = {
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

      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    expect(reducer(initial1, setPatchUserRequestAction()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserRequestAction()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserRequestAction()))
      .toEqual(expected3);
  })

  it('setPatchUserSuccess() should set correct request status', () => {
    const initial1 = {
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

      user,
    };
    const initial2 = {
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

      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      PATCH_USER_FAILURE: true,

      user: null,
    };

    const expected = {
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
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,

      user,
    };
    const expected3 = {
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
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    expect(reducer(initial1, setPatchUserSuccessAction()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserSuccessAction()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserSuccessAction()))
      .toEqual(expected3);
  })

  it('setPatchUserFailure() should set correct request status', () => {
    const initial1 = {
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

      user,
    };
    const initial2 = {
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

      PATCH_USER_REQUEST: true,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: false,

      user,
    };
    const initial3 = {
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
      PATCH_USER_SUCCESS: true,
      PATCH_USER_FAILURE: false,

      user: null,
    };

    const expected = {
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
      PATCH_USER_FAILURE: true,

      user,
    };
    const expected3 = {
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
      PATCH_USER_FAILURE: true,

      user: null,
    };

    expect(reducer(initial1, setPatchUserFailureAction()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserFailureAction()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserFailureAction()))
      .toEqual(expected3);
  })
});


describe('Test user thunk functions', () => {
  it('Test refreshToken() should call provided action', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        accessToken: 'Bearer tokenTokenToken',
      })
    }) as any;

    const store = mockStore({});
    const action = { type: 'testAction', payload: 'test' };
    const expectedActions = [
      action,
    ];

    return store.dispatch(refreshToken(action)).then(() => {
      const actions = store.getActions(expectedActions);

      expect(actions).toEqual(expectedActions);
    });
  })

  it('Test registerUser()', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          accessToken: 'Bearer tokenTokenToken',
          user,
        }),
      })
    }) as any;

    const store = mockStore({
      user: initialState
    });
    const requestPayload = {
      email: 'example@mail.com',
      password: '123456'
    };
    const expectedActions = [
      { type: 'USER_SET_USER', payload: user },
      { type: 'USER_SET_REGISTER_SUCCESS' }
    ];

    return store.dispatch(registerUser(requestPayload))
      .then(() => {
        const actions = store.getActions()

        expect(actions).toEqual(expectedActions);
      });
  })

  it('Test loadUserData()', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user,
        }),
      })
    }) as any;

    const store = mockStore({
      user: initialState
    });

    const expectedActions = [
      { type: 'USER_SET_GET_USER_REQUEST' },
      { type: 'USER_SET_USER', payload: user },
      { type: 'USER_SET_GET_USER_SUCCESS' },
    ];

    return store.dispatch(loadUserData())
      .then(() => {
        const actions = store.getActions()

        expect(actions).toEqual(expectedActions);
      });
  })

  it('Test patchUserData()', () => {
    const requestPayload = {
      email: 'another@mail.com',
      name: 'Another Name',
      password: 'aNother'
    };

    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user: requestPayload,
        }),
      })
    }) as any;

    const store = mockStore({
      user: initialState
    });

    const expectedActions = [
      { type: 'USER_SET_PATCH_USER_REQUEST' },
      { type: 'USER_SET_USER', payload: requestPayload },
      { type: 'USER_SET_PATCH_USER_SUCCESS' },
    ];

    return store.dispatch(patchUserData(requestPayload))
      .then(() => {
        const actions = store.getActions()

        expect(actions).toEqual(expectedActions);
      });
  })

  it('Test loginUser()', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          user,
          accessToken: 'Bearer tokenTokenToken',
        }),
      })
    }) as any;

    const store = mockStore({
      user: initialState
    });

    const expectedActions = [
      { type: 'USER_SET_LOGIN_REQUEST' },
      { type: 'USER_SET_USER', payload: user },
      { type: 'USER_SET_LOGIN_SUCCESS' },
    ];

    return store.dispatch(loginUser(user))
      .then(() => {
        const actions = store.getActions()

        expect(actions).toEqual(expectedActions);
      });
  })

  it('Test logoutUser()', () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
      })
    }) as any;

    const store = mockStore({
      user: {
        ...initialState,
        ...user
      }
    });

    const expectedActions = [
      { type: 'USER_SET_LOGOUT_REQUEST' },
      { type: 'USER_SET_USER', payload: null },
      { type: 'USER_SET_LOGOUT_SUCCESS' },
    ];

    return store.dispatch(logoutUser())
      .then(() => {
        const actions = store.getActions()

        expect(actions).toEqual(expectedActions);
      });
  })
});
