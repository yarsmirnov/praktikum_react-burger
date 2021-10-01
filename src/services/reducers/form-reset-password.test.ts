import reducer from './form-reset-password';
import {
  setValueAction,
  clearFormAction,
  requestAction,
  successAction,
  failureAction,

  resetPasswordAction
} from '../actions/form-reset-password';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './form-reset-password';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Test form-reset-password reducer', () => {

  it('setValue() should set correct value', () => {
    const initial1 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '',
        token: '',
      }
    };
    const initial2 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: '',
      }
    };
    const payload1 = { name: 'password', value: '123456' };
    const payload2 = {
      name: 'token',
      value: 'tokenTokenTokenTokenToken'
    };

    const expected1 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: '',
      }
    };
    const expected2 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };

    expect(reducer(initial1, setValueAction(payload1)))
      .toEqual(expected1);
    expect(reducer(initial2, setValueAction(payload2)))
      .toEqual(expected2);
  })


  it('clearForm() should reset form values to empty string', () => {
    const initial = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };

    const expected = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,

      form: {
        password: '',
        token: '',
      }
    };

    expect(reducer(initial, clearFormAction()))
      .toEqual(expected);
  })

  it('request() should change request status correctly', () => {
    const initial1 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,

      form: {
        password: '',
        token: '',
      }
    };
    const initial2 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_FAILURE: false,

      form: {
        password: '',
        token: '',
      }
    };
    const initial3 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: true,

      form: {
        password: '',
        token: '',
      }
    };

    const expected = {
      RESET_PASSWORD_REQUEST: true,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,

      form: {
        password: '',
        token: '',
      }
    };

    expect(reducer(initial1, requestAction()))
      .toEqual(expected);
    expect(reducer(initial2, requestAction()))
      .toEqual(expected);
    expect(reducer(initial3, requestAction()))
      .toEqual(expected);
  })

  it('success() should change request status and reset form fields to empty string', () => {
    const initial1 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };
    const initial2 = {
      RESET_PASSWORD_REQUEST: true,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };
    const initial3 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: true,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };

    const expected = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '',
        token: '',
      }
    };

    expect(reducer(initial1, successAction()))
      .toEqual(expected);
    expect(reducer(initial2, successAction()))
      .toEqual(expected);
    expect(reducer(initial3, successAction()))
      .toEqual(expected);
  })

  it('failure() should change request status correctly', () => {
    const initial1 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };
    const initial2 = {
      RESET_PASSWORD_REQUEST: true,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };
    const initial3 = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };

    const expected = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: false,
      RESET_PASSWORD_FAILURE: true,
      form: {
        password: '123456',
        token: 'tokenTokenTokenTokenToken',
      }
    };

    expect(reducer(initial1, failureAction()))
      .toEqual(expected);
    expect(reducer(initial2, failureAction()))
      .toEqual(expected);
    expect(reducer(initial3, failureAction()))
      .toEqual(expected);
  })
});


describe('Test form-reset-password thunk', () => {
  it('Test resetPassword()', ()  => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
        }),
      })
    }) as any;

    const formMock = {
      password: '123456',
      token: 'tokenTokenToken',
    };

    const store = mockStore({
      formResetPassword: {
        ...initialState,
        form: formMock
      }
    });

    const expectedActions = [
      { type: 'FORM_RESET_PASSWORD_REQUEST' },
      { type: 'FORM_RESET_PASSWORD_SUCCESS' }
    ];

    return store.dispatch(resetPasswordAction()).then(() => {
      const actions = store.getActions()
      expect(actions).toEqual(expectedActions);
    });
  })
});
