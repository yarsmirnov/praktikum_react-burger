import reducer from './form-reset-password';
import {
  setValue,
  clearForm,
  request,
  success,
  failure
} from './form-reset-password';


describe('Test form-reset-password reducer', () => {
  it('Uncnown action should retur initial state', () => {
    const initial = {
      RESET_PASSWORD_REQUEST: false,
      RESET_PASSWORD_SUCCESS: true,
      RESET_PASSWORD_FAILURE: false,
      form: {
        password: '123456',
        token: '',
      }
    };

    expect(reducer(initial, {}))
      .toEqual(initial);
  })


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

    expect(reducer(initial1, setValue(payload1)))
      .toEqual(expected1);
    expect(reducer(initial2, setValue(payload2)))
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

    expect(reducer(initial, clearForm()))
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

    expect(reducer(initial1, request()))
      .toEqual(expected);
    expect(reducer(initial2, request()))
      .toEqual(expected);
    expect(reducer(initial3, request()))
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

    expect(reducer(initial1, success()))
      .toEqual(expected);
    expect(reducer(initial2, success()))
      .toEqual(expected);
    expect(reducer(initial3, success()))
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

    expect(reducer(initial1, failure()))
      .toEqual(expected);
    expect(reducer(initial2, failure()))
      .toEqual(expected);
    expect(reducer(initial3, failure()))
      .toEqual(expected);
  })
});
