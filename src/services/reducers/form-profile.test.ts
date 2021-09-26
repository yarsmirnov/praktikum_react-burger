import reducer from './form-profile';
import {
  setInitialValueAction,
  setValueAction,
  resetFormAction,
  clearFormAction,
} from '../actions/form-profile';


describe('Test form-profile reducer', () => {

  it('setInitialValue() should set form and initialForm', () => {
    const initialState = {
      initialForm: {
        email: '',
        password: '',
        name: '',
      },
      form: {
        email: '',
        password: '',
        name: '',
      },
    };

    const payload1 = {
      email: 'example1@mail.com',
      name: 'Payload First',
    };
    const payload2 = {
      email: 'example2@mail.com',
      password: '0123456789',
      name: 'mr. Payload II',
    };

    const expected1 = {
      initialForm: {
        email: 'example1@mail.com',
        password: '',
        name: 'Payload First',
      },
      form: {
        email: 'example1@mail.com',
        password: '',
        name: 'Payload First',
      },
    };
    const expected2 = {
      initialForm: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'mr. Payload II',
      },
      form: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'mr. Payload II',
      },
    };

    expect(reducer(initialState, setInitialValueAction(payload1)))
      .toEqual(expected1);
    expect(reducer(expected1, setInitialValueAction(payload2)))
      .toEqual(expected2);
  })

  it(`setValue() should change only form's fields`, () => {
    const initialState = {
      initialForm: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Name',
      },
    };

    const payload1 = { name: 'email', value: 'test@mail.com' };
    const payload2 = { name: 'name', value: 'Test Name' };
    const payload3 = { name: 'password', value: 'sequrity' };

    const expected1 = {
      initialForm: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'test@mail.com',
        password: '0123456789',
        name: 'Name',
      },
    };
    const expected2 = {
      initialForm: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Test Name',
      },
    };
    const expected3 = {
      initialForm: {
        email: 'example2@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'example2@mail.com',
        password: 'sequrity',
        name: 'Name',
      },
    };

    expect(reducer(initialState, setValueAction(payload1)))
      .toEqual(expected1);
    expect(reducer(initialState, setValueAction(payload2)))
      .toEqual(expected2);
    expect(reducer(initialState, setValueAction(payload3)))
      .toEqual(expected3);
  })

  it('resetForm() should set form values from initialForm', () => {
    const initialState = {
      initialForm: {
        email: 'example@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'another@mail.com',
        password: 'anotherPassword',
        name: 'Another Name',
      },
    };

    const expected = {
      initialForm: {
        email: 'example@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'example@mail.com',
        password: '0123456789',
        name: 'Name',
      },
    };

    expect(reducer(initialState, resetFormAction()))
      .toEqual(expected);
  });

  it('clearForm() should reset form & initialForm to empty', () => {
    const initial = {
      initialForm: {
        email: 'example@mail.com',
        password: '0123456789',
        name: 'Name',
      },
      form: {
        email: 'another@mail.com',
        password: 'anotherPassword',
        name: 'Another Name',
      },
    };

    const expected = {
      initialForm: {
        email: '',
        password: '',
        name: '',
      },
      form: {
        email: '',
        password: '',
        name: '',
      },
    };

    expect(reducer(initial, clearFormAction()))
      .toEqual(expected);
  })
});
