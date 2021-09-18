import reducer from './order';
import {
  request,
  success,
  failure,
  resetRequestStatus
} from './order';


const orderData = {
  name: 'Space флюоресцентный бургер',
  ingredients: [
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733cd',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    }
  ],
  _id: '61462daadab0f3001bb06c17',
  owner: {
    name: 'Name',
    email: 'example@mail.com',
    createdAt: '2021-08-28T16:15:36.289Z',
    updatedAt: '2021-09-02T13:49:29.328Z'
  },
  status: 'done',
  createdAt: '2021-09-18T18:19:22.186Z',
  updatedAt: '2021-09-18T18:19:22.368Z',
  number: 3511,
  price: 2056
}


describe('Test order reducer', () => {
  it('request() should set correct request status', () => {
    const initial1 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial2 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
      orderData: {},
    };

    const expected = {
      ORDER_REQUEST: true,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };

    expect(reducer(initial1, request()))
      .toEqual(expected);
    expect(reducer(initial2, request()))
      .toEqual(expected);
    expect(reducer(initial3, request()))
      .toEqual(expected);
  })

  it('success() should set correct request status and orderData', () => {
    const initial1 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial2 = {
      ORDER_REQUEST: true,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
      orderData: {},
    };
    const payload = { ...orderData };

    const expected = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData: { ...orderData },
    };

    expect(reducer(initial1, success(payload)))
      .toEqual(expected);
    expect(reducer(initial2, success(payload)))
      .toEqual(expected);
    expect(reducer(initial3, success(payload)))
      .toEqual(expected);
  })

  it('failure() should set correct request status and reset orderData value', () => {
    const initial1 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial2 = {
      ORDER_REQUEST: true,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData,
    };

    const expected = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
      orderData: {},
    };

    expect(reducer(initial1, failure()))
      .toEqual(expected);
    expect(reducer(initial2, failure()))
      .toEqual(expected);
    expect(reducer(initial3, failure()))
      .toEqual(expected);
  })

  it('resetRequestStatus() should reset all requests statuses', () => {
    const initial1 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const initial2 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData,
    };
    const initial3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
      orderData: {},
    };

    const expected1 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };
    const expected2 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData,
    };
    const expected3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };

    expect(reducer(initial1, resetRequestStatus()))
      .toEqual(expected1);
    expect(reducer(initial2, resetRequestStatus()))
      .toEqual(expected2);
    expect(reducer(initial3, resetRequestStatus()))
      .toEqual(expected3);
  })
});
