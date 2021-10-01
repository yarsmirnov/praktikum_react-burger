import reducer, { initialState } from './websocket';
import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../actions/websocket';
import {
  TWsOrderRecieved,
  TOrdersTapeResponse,
} from '../types/data';


const order1: TWsOrderRecieved = {
  _id: '613667fc47707f001b152d73',
  status: 'pending',
  name: 'Spicy флюоресцентный бургер',
  createdAt: '2021-09-06T19:11:56.450Z',
  updatedAt: '2021-09-06T19:11:56.578Z',
  number: 2568,
  ingredients: [
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c7'
  ],
};

const order2: TWsOrderRecieved = {
  _id: '613664f647707f001b152d71',
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2021-09-06T18:59:02.438Z',
  updatedAt: '2021-09-06T18:59:02.584Z',
  number: 2567,
  ingredients: [
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c7'
  ],
};

const serverResponse: TOrdersTapeResponse = {
  success: true,
  total: 997,
  totalToday: 6,
  orders: [ order1, order2 ],
};


describe('Test websocket reducer', () => {

  it('wsConnectionStart() should reset state to initial values', () => {
    const initial: typeof initialState = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: 'Too many burgers today'
    };

    const expected: typeof initialState = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    expect(reducer(initial, wsConnectionStart('/')))
      .toEqual(expected);
  })

  it('wsConnectionSuccess() should set error to null and connected status to true', () => {
    const initial: typeof initialState = {
      wsConnected: false,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: 'Too many burgers today'
    };

    const expected: typeof initialState = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: null
    };

    expect(reducer(initial, wsConnectionSuccess()))
      .toEqual(expected);
  })

  it('wsConnectionError() should set connected status to false and error', () => {
    const initial: typeof initialState = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: null
    };
    const payload = `The error's come`;

    const expected: typeof initialState = {
      wsConnected: false,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: payload
    };

    expect(reducer(initial, wsConnectionError(payload)))
      .toEqual(expected);
  })

  it('wsConnectionClosed() should reset state to initial values', () => {
    const initial: typeof initialState = {
      wsConnected: true,
      orders: [ order1, order2 ],
      total: 100500,
      totalToday: 15,
      error: 'Some body was told me, the world is ...'
    };

    const expected: typeof initialState = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    expect(reducer(initial, wsConnectionClosed()))
      .toEqual(expected);
  })

  it('wsGetMessage() should fulfill fields with payload data', () => {
    const initial: typeof initialState = {
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    }
    const { orders, total, totalToday } = serverResponse;

    const expected: typeof initialState = {
      wsConnected: true,
      orders,
      total,
      totalToday,
      error: null
    };

    expect(reducer(initial, wsGetMessage(serverResponse)))
      .toEqual(expected);
  })
});
