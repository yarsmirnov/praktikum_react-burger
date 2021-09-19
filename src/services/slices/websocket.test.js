import reducer from './websocket';
import {
  CONNECTION_START,
  CONNECTION_SUCCESS,
  CONNECTION_ERROR,
  CONNECTION_CLOSED,
  GET_MESSAGE,
} from './websocket';


const order1 = {
  '_id': '613667fc47707f001b152d73',
  'ingredients': [
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c7'
  ],
  'status': 'cooking',
  'name': 'Spicy флюоресцентный бургер',
  'createdAt': '2021-09-06T19:11:56.450Z',
  'updatedAt': '2021-09-06T19:11:56.578Z',
  'number': 2568
};

const order2 = {
  '_id': '613664f647707f001b152d71',
  'ingredients': [
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c7'
  ],
  'status': 'done',
  'name': 'Space флюоресцентный бургер',
  'createdAt': '2021-09-06T18:59:02.438Z',
  'updatedAt': '2021-09-06T18:59:02.584Z',
  'number': 2567
};

const serverResponse = {
  success: true,
  orders: [ order1, order2 ],
  total: 997,
  totalToday: 6
};


describe('Test websocket reducer', () => {
  it('Unknown action should return state current', () => {
    const initial = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    expect(reducer(initial, {}))
      .toEqual(initial);
  })

  it('CONNECTION_START() should reset state to initial values', () => {
    const initial = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: 'Too many burgers today'
    };

    const expected = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    expect(reducer(initial, CONNECTION_START()))
      .toEqual(expected);
  })

  it('CONNECTION_SUCCESS() should set error to null and connected status to true', () => {
    const initial = {
      wsConnected: false,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: 'Too many burgers today'
    };

    const expected = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: null
    };

    expect(reducer(initial, CONNECTION_SUCCESS()))
      .toEqual(expected);
  })

  it('CONNECTION_ERROR() should set connected status to false and error', () => {
    const initial = {
      wsConnected: true,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: null
    };
    const payload = `The error's come`;

    const expected = {
      wsConnected: false,
      orders: serverResponse.orders,
      total: 497,
      totalToday: 73,
      error: payload
    };

    expect(reducer(initial, CONNECTION_ERROR(payload)))
      .toEqual(expected);
  })

  it('CONNECTION_CLOSED() should reset state to initial values', () => {
    const initial = {
      wsConnected: true,
      orders: [ order1, order2 ],
      total: 100500,
      totalToday: 15,
      error: 'Some body was told me, the world is ...'
    };

    const expected = {
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    expect(reducer(initial, CONNECTION_CLOSED()))
      .toEqual(expected);
  })

  it('GET_MESSAGE() should fulfill fields with payload data', () => {
    const initial = {
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    }
    const { orders, total, totalToday } = serverResponse;

    const expected = {
      wsConnected: true,
      orders,
      total,
      totalToday,
      error: null
    };

    expect(reducer(initial, GET_MESSAGE(serverResponse)))
      .toEqual(expected);
  })
});
