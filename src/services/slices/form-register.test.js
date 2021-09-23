import reducer from './form-register';
import {
  setValue,
  clearForm,
} from './form-register';


describe('Test form-register reducer', () => {
  it('setValue() should set correct value', () => {
    const initial1 = {
      form: {
        email: "",
        password: "",
        name: "",
      }
    };
    const initial2 = {
      form: {
        email: "example@mail.com",
        password: "",
        name: "",
      }
    };
    const initial3 = {
      form: {
        email: "example@mail.com",
        password: "123456",
        name: "",
      }
    };
    const payload1 = { name: 'email', value: 'example@mail.com' };
    const payload2 = { name: 'password', value: '123456' };
    const payload3 = { name: 'name', value: 'Some Name' };

    const expected1 = {
      form: {
        email: "example@mail.com",
        password: "",
        name: "",
      }
    };
    const expected2 = {
      form: {
        email: "example@mail.com",
        password: "123456",
        name: "",
      }
    };
    const expected3 = {
      form: {
        email: "example@mail.com",
        password: "123456",
        name: "Some Name",
      }
    };

    expect(reducer(initial1, setValue(payload1)))
      .toEqual(expected1);
    expect(reducer(initial2, setValue(payload2)))
      .toEqual(expected2);
    expect(reducer(initial3, setValue(payload3)))
      .toEqual(expected3);
  })

  it('clearForm() should reset form to empty fields', () => {
    const initial = {
      form: {
        email: "example@mail.com",
        password: "123456",
        name: "Some Name",
      }
    };

    const expected = {
      form: {
        email: "",
        password: "",
        name: "",
      }
    };

    expect(reducer(initial, clearForm()))
      .toEqual(expected);
  })
});
