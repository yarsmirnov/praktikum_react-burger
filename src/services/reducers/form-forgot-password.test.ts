import reducer from './form-forgot-password';
import {
  setValueAction,
  setVerifiedEmailAction,
  clearFormAction,
  requestAction,
  successAction,
  failureAction,

  verifyEmailAction
} from '../actions/form-forgot-password';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './form-forgot-password';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Test form-forgot-password reducer', () => {
  const initialState = {
    VERIFY_EMAIL_REQUEST: false,
    VERIFY_EMAIL_SUCCESS: false,
    VERIFY_EMAIL_FAILURE: false,

    verifiedEmail: null,

    form: {
      email: '',
    }
  };

  it('setValueAction() correctly change store.form', () => {
    const payload1 = { name: 'email', value: 'example@test.com' };
    const payload2 = { name: 'email', value: 'test@example.com' };

    const expected1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: 'example@test.com',
      }
    };

    const expected2 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: 'test@example.com',
      }
    };

    expect(reducer({ ...initialState }, setValueAction(payload1)))
      .toEqual(expected1);
    expect(reducer({ ...expected1 }, setValueAction(payload2)))
      .toEqual(expected2);
  })

  it('clearFormAction() should reset store.form to initialState', () => {
    const initialStore1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: 'example@test.com',
      }
    };
    const initialStore2 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: 'varified@example.com',

      form: {
        email: 'example@test.com',
      }
    };

    const expected1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const expected2 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: 'varified@example.com',

      form: {
        email: '',
      }
    };

    expect(reducer(initialStore1, clearFormAction()))
      .toEqual(expected1);

    expect(reducer(initialStore2, clearFormAction()))
      .toEqual(expected2);
  })

  it('setVerifiedEmailAction() should set verifiedEmail', () => {
    const initialStore = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: 'test@example.com',
      }
    };

    const expected = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: 'verifiedEmail@example.com',

      form: {
        email: 'test@example.com',
      }
    }

    expect(reducer(initialStore, setVerifiedEmailAction('verifiedEmail@example.com')))
      .toEqual(expected);
  });

  it('request() should set correct status', () => {
    const initialState1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState2 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: true,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState3 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: true,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    const expected = {
      VERIFY_EMAIL_REQUEST: true,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    expect(reducer(initialState1, requestAction()))
      .toEqual(expected);
    expect(reducer(initialState2, requestAction()))
      .toEqual(expected);
    expect(reducer(initialState3, requestAction()))
      .toEqual(expected);
  })

  it('failure() should set correct status', () => {
    const initialState1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState2 = {
      VERIFY_EMAIL_REQUEST: true,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState3 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: true,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    const expected = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: true,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    expect(reducer(initialState1, failureAction()))
      .toEqual(expected);
    expect(reducer(initialState2, failureAction()))
      .toEqual(expected);
    expect(reducer(initialState3, failureAction()))
      .toEqual(expected);
  })

  it('success() should set correct status', () => {
    const initialState1 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState2 = {
      VERIFY_EMAIL_REQUEST: true,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };
    const initialState3 = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: false,
      VERIFY_EMAIL_FAILURE: true,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    const expected = {
      VERIFY_EMAIL_REQUEST: false,
      VERIFY_EMAIL_SUCCESS: true,
      VERIFY_EMAIL_FAILURE: false,

      verifiedEmail: null,

      form: {
        email: '',
      }
    };

    expect(reducer(initialState1, successAction()))
      .toEqual(expected);
    expect(reducer(initialState2, successAction()))
      .toEqual(expected);
    expect(reducer(initialState3, successAction()))
      .toEqual(expected);
  })
});


describe('Test form-forgot-password thunk', () => {
  it('Test verifyEmailAction()', ()  => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
        }),
      })
    });

    const verifiedEmail = 'example@mail.com';

    const store = mockStore({
      formForgotPassword: {
        ...initialState,
        form: {
          email: verifiedEmail,
        }
      }
    });

    const expectedActions = [
      {
        type: 'FORM_FORGOT_PASSWORD_REQUEST',
      },
      {
        type: 'FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL',
        payload: null
      },
      { type:
        'FORM_FORGOT_PASSWORD_SUCCESS',
      },
      {
        type: 'FORM_FORGOT_PASSWORD_SET_VERIFIED_EMAIL',
        payload: 'example@mail.com'
      }
    ];

    return store.dispatch(verifyEmailAction()).then(() => {
      const actions = store.getActions()
      expect(actions).toEqual(expectedActions);
    });
  })
});
