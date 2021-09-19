import reducer from './user';
import {
  setUser,

  setRegisterRequest,
  setRegisterSuccess,
  setRegisterFailure,

  setLoginRequest,
  setLoginSuccess,
  setLoginFailure,

  setLogoutRequest,
  setLogoutSuccess,
  setLogoutFailure,

  setGetUserRequest,
  setGetUserSuccess,
  setGetUserFailure,

  setPatchUserRequest,
  setPatchUserSuccess,
  setPatchUserFailure
} from './user';


const user = { email: 'example@mail.com', name: 'Some Name' };


describe('Test user reducer', () => {
  it('Unknown action should return state', () => {
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

      LOGIN_REQUEST: true,
      LOGIN_SUCCESS: false,
      LOGIN_FAILURE: false,

      LOGOUT_REQUEST: false,
      LOGOUT_SUCCESS: false,
      LOGOUT_FAILURE: true,

      GET_USER_REQUEST: false,
      GET_USER_SUCCESS: true,
      GET_USER_FAILURE: false,

      PATCH_USER_REQUEST: false,
      PATCH_USER_SUCCESS: false,
      PATCH_USER_FAILURE: true,

      user,
    };

    expect(reducer(initial1, {}))
      .toEqual(initial1);
    expect(reducer(initial2, {}))
      .toEqual(initial2);
  })

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

    expect(reducer(initial, setUser(payload)))
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

    expect(reducer(initial1, setRegisterRequest()))
      .toEqual(expeted);
    expect(reducer(initial2, setRegisterRequest()))
      .toEqual(expeted);
    expect(reducer(initial3, setRegisterRequest()))
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

    expect(reducer(initial1, setRegisterSuccess()))
      .toEqual(expected1);
    expect(reducer(initial2, setRegisterSuccess()))
      .toEqual(expected2);
    expect(reducer(initial3, setRegisterSuccess()))
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

    expect(reducer(initial1, setRegisterFailure()))
      .toEqual(expected);
    expect(reducer(initial2, setRegisterFailure()))
      .toEqual(expected);
    expect(reducer(initial3, setRegisterFailure()))
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

    expect(reducer(initial1, setLoginRequest()))
      .toEqual(expected);
    expect(reducer(initial2, setLoginRequest()))
      .toEqual(expected);
    expect(reducer(initial3, setLoginRequest()))
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

    expect(reducer(initial1, setLoginSuccess()))
      .toEqual(expected1);
    expect(reducer(initial2, setLoginSuccess()))
      .toEqual(expected2);
    expect(reducer(initial3, setLoginSuccess()))
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

    expect(reducer(initial1, setLoginFailure()))
      .toEqual(expected);
    expect(reducer(initial2, setLoginFailure()))
      .toEqual(expected);
    expect(reducer(initial3, setLoginFailure()))
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

    expect(reducer(initial1, setLogoutRequest()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutRequest()))
      .toEqual(expected);
    expect(reducer(initial3, setLogoutRequest()))
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

    expect(reducer(initial1, setLogoutSuccess()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutSuccess()))
      .toEqual(expected);
    expect(reducer(initial3, setLogoutSuccess()))
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

    expect(reducer(initial1, setLogoutFailure()))
      .toEqual(expected);
    expect(reducer(initial2, setLogoutFailure()))
      .toEqual(expected2);
    expect(reducer(initial3, setLogoutFailure()))
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

    expect(reducer(initial1, setGetUserRequest()))
      .toEqual(expected);
    expect(reducer(initial2, setGetUserRequest()))
      .toEqual(expected2);
    expect(reducer(initial3, setGetUserRequest()))
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

    expect(reducer(initial1, setGetUserSuccess()))
      .toEqual(expected);
    expect(reducer(initial2, setGetUserSuccess()))
      .toEqual(expected2);
    expect(reducer(initial3, setGetUserSuccess()))
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

    expect(reducer(initial1, setGetUserFailure()))
      .toEqual(expected1);
    expect(reducer(initial2, setGetUserFailure()))
      .toEqual(expected);
    expect(reducer(initial3, setGetUserFailure()))
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

    expect(reducer(initial1, setPatchUserRequest()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserRequest()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserRequest()))
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

    expect(reducer(initial1, setPatchUserSuccess()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserSuccess()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserSuccess()))
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

    expect(reducer(initial1, setPatchUserFailure()))
      .toEqual(expected);
    expect(reducer(initial2, setPatchUserFailure()))
      .toEqual(expected);
    expect(reducer(initial3, setPatchUserFailure()))
      .toEqual(expected3);
  })
});
