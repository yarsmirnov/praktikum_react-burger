import reducer from './form-login';
import {
  setValueAction,
  clearFormAction,
} from '../actions/form-login';


describe('Test form-login reducers', () => {
  const initialState = {
    form: {
      email: "",
      password: "",
    }
  };


  it('setValue() correctly change store.form', () => {
    const payload1 = {
      name: 'email',
      value: 'example@test.com'
    };
    const payload2 = {
      name: 'password',
      value: '01234'
    };
    const payload3 = {
      name: 'email',
      value: 'test@mail.com'
    };

    const expectedResult1 = {
      form: {
        email: 'example@test.com',
        password: ''
      }
    };
    const expectedResult2 = {
      form: {
        email: 'example@test.com',
        password: '01234'
      }
    };
    const expectedResult3 = {
      form: {
        email: 'test@mail.com',
        password: '01234'
      }
    };

    expect(reducer({ ...initialState }, setValueAction(payload1)))
      .toEqual(expectedResult1);
    expect(reducer({ ...expectedResult1 }, setValueAction(payload2)))
      .toEqual(expectedResult2);
    expect(reducer({ ...expectedResult2 }, setValueAction(payload3)))
      .toEqual(expectedResult3);
  })


  it('clearForm() should reset store.form to initialState', () => {
    const storeWithFilledUpForm = {
      form: {
        email: 'test@mail.com',
        password: '01234'
      }
    };

    const expetcted = {
      form: {
        email: '',
        password: ''
      }
    };

    expect(reducer(storeWithFilledUpForm, clearFormAction()))
      .toEqual(expetcted);
  })
});
