import reducer from './form-forgot-password';
import {
  setValue,
  setVerifiedEmail,
  clearForm,
  request,
  success,
  failure,

  verifyEmail
} from './form-forgot-password';


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

  it('Unknown action should return initial state', () => {
    expect(reducer({ ...initialState }, {}))
      .toEqual({ ...initialState });
  })

  it('setValue() correctly change store.form', () => {
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

    expect(reducer({ ...initialState }, setValue(payload1)))
      .toEqual(expected1);
    expect(reducer({ ...expected1 }, setValue(payload2)))
      .toEqual(expected2);
  })

  it('clearForm() should reset store.form to initialState', () => {
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

    expect(reducer(initialStore1, clearForm()))
      .toEqual(expected1);

    expect(reducer(initialStore2, clearForm()))
      .toEqual(expected2);
  })

  it('setVerifiedEmail() should set verifiedEmail', () => {
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

    expect(reducer(initialStore, setVerifiedEmail('verifiedEmail@example.com')))
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

    expect(reducer(initialState1, request()))
      .toEqual(expected);
    expect(reducer(initialState2, request()))
      .toEqual(expected);
    expect(reducer(initialState3, request()))
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

    expect(reducer(initialState1, failure()))
      .toEqual(expected);
    expect(reducer(initialState2, failure()))
      .toEqual(expected);
    expect(reducer(initialState3, failure()))
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

    expect(reducer(initialState1, success()))
      .toEqual(expected);
    expect(reducer(initialState2, success()))
      .toEqual(expected);
    expect(reducer(initialState3, success()))
      .toEqual(expected);
  })
});
