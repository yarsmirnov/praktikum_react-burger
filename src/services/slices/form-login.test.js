import reducer from './form-login';
import {
  setValue,
  clearForm,
} from './form-login';


describe('Test form-login reducers', () => {
  const initialState = {
    form: {
      email: "",
      password: "",
    }
  };

  it('Unknown action should return the initial state', () => {
    expect(reducer({ ...initialState }, {})).toEqual({ ...initialState });
  })


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

    expect(reducer({ ...initialState }, setValue(payload1)))
      .toEqual(expectedResult1);
    expect(reducer({ ...expectedResult1 }, setValue(payload2)))
      .toEqual(expectedResult2);
    expect(reducer({ ...expectedResult2 }, setValue(payload3)))
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

    expect(reducer(storeWithFilledUpForm, clearForm()))
      .toEqual(expetcted);
  })
});
