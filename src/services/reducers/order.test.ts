import reducer from './order';
import {
  requestAction,
  successAction,
  failureAction,
  resetRequestStatusAction,

  sendOrderRequestAction
} from '../actions/order';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './order';

import { TOrderSent, TOrderSentResponse } from '../types/data';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const orderDataForSend: TOrderSent = {
  ingredients: [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733c6"
  ]
};

const responseData: TOrderSentResponse = {
  success: true,
  name:"Краторный бессмертный бургер",
  order: {
    _id: "61489bdfdab0f3001bb070eb",
    name:"Краторный бессмертный бургер",
    status: "done",
    createdAt: "2021-09-20T14:34:07.128Z",
    updatedAt: "2021-09-20T14:34:07.248Z",
    number: 3586,
    price: 3847,
    owner: {
      name: "User Name",
      email: "example@mail.com",
      createdAt: "2021-08-28T16:15:36.289Z",
      updatedAt: "2021-09-02T13:49:29.328Z",
    },
    ingredients: [
      {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      }, {
        _id: "60d3b41abdacab0026a733c9",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        __v: 0
      }, {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      }
    ],
  }
};

const successPayload = {
  ...responseData.order
};


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

    expect(reducer(initial1, requestAction()))
      .toEqual(expected);
    expect(reducer(initial2, requestAction()))
      .toEqual(expected);
    expect(reducer(initial3, requestAction()))
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

    const expected = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: true,
      ORDER_FAILURE: false,
      orderData: successPayload,
    };

    expect(reducer(initial1, successAction(successPayload)))
      .toEqual(expected);
    expect(reducer(initial2, successAction(successPayload)))
      .toEqual(expected);
    expect(reducer(initial3, successAction(successPayload)))
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
      orderData: successPayload,
    };

    const expected = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: true,
      orderData: {},
    };

    expect(reducer(initial1, failureAction()))
      .toEqual(expected);
    expect(reducer(initial2, failureAction()))
      .toEqual(expected);
    expect(reducer(initial3, failureAction()))
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
      orderData: successPayload,
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
      orderData: successPayload,
    };
    const expected3 = {
      ORDER_REQUEST: false,
      ORDER_SUCCESS: false,
      ORDER_FAILURE: false,
      orderData: {},
    };

    expect(reducer(initial1, resetRequestStatusAction()))
      .toEqual(expected1);
    expect(reducer(initial2, resetRequestStatusAction()))
      .toEqual(expected2);
    expect(reducer(initial3, resetRequestStatusAction()))
      .toEqual(expected3);
  })
});


describe('Test order thunk', () => {
  it('Test sendOrderRequestAction()', ()  => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          ...responseData
        }),
      })
    }) as any;


    const store = mockStore({
      formResetPassword: initialState,
    });

    const expectedActions = [
      { type: 'ORDER_REQUEST' },
      { type: 'ORDER_SUCCESS', payload: successPayload },
    ];

    return store.dispatch(sendOrderRequestAction(orderDataForSend))
      .then(() => {
        const actions = store.getActions();

        expect(actions).toEqual(expectedActions);
      });
  })
});
