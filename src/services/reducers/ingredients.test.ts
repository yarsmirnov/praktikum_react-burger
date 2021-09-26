import reducer from './ingredients';
import {
  requestAction,
  successAction,
  failureAction,
  increaseIngredientCountAction,
  decreaseIngredientCountAction,
  resetIngredientsCounterAction,

  getIngredientsAction
} from '../actions/ingredients';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './ingredients';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const bun1 = {
  id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  imageMobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  imageLarge: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  count: 0,
  __v: 0
};
const bun1Raw = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  count: 0,
  __v: 0
};
const bun2 = {
  id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  imageMobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  imageLarge: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  count: 0,
  __v: 0
};
const ingredient1 = {
  id: '60d3b41abdacab0026a733c8',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  imageMobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  imageLarge: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  count: 0,
  __v: 0
};
const ingredient1Raw = {
  _id: '60d3b41abdacab0026a733c8',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  count: 0,
  __v: 0
};
const ingredient2 = {
  id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  imageMobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  imageLarge: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  count: 0,
  __v: 0
};

describe('Test ingredients reducer', () => {
  it('request() should change request status correctly', () => {
    const initial1 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial2 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: true,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial3 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: true,
      items: [],
    };

    const expected = {
      INGREDIENTS_REQUEST: true,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };

    expect(reducer(initial1, requestAction()))
      .toEqual(expected);
    expect(reducer(initial2, requestAction()))
      .toEqual(expected);
    expect(reducer(initial3, requestAction()))
      .toEqual(expected);
  })

  it('success() should set correct state and set items', () => {
    const initial1 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial2 = {
      INGREDIENTS_REQUEST: true,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial3 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: true,
      items: [],
    };
    const payload = [ bun1, bun2, ingredient1, ingredient2 ];

    const expected = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: true,
      INGREDIENTS_FAILURE: false,
      items: [ bun1, bun2, ingredient1, ingredient2 ],
    };

    expect(reducer(initial1, successAction(payload)))
      .toEqual(expected);
    expect(reducer(initial2, successAction(payload)))
      .toEqual(expected);
    expect(reducer(initial3, successAction(payload)))
      .toEqual(expected);
  })

  it('failure() should set correct request status and reset items to empty array', () => {
    const initial1 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial2 = {
      INGREDIENTS_REQUEST: true,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [],
    };
    const initial3 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: true,
      INGREDIENTS_FAILURE: false,
      items: [ bun1, ingredient1 ],
    };

    const expected = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: true,
      items: [],
    };

    expect(reducer(initial1, failureAction()))
      .toEqual(expected);
    expect(reducer(initial2, failureAction()))
      .toEqual(expected);
    expect(reducer(initial3, failureAction()))
      .toEqual(expected);
  })

  it('increaseIngredientCount() should increase ingredient count by 1', () => {
    const initial = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [ bun1, bun2, ingredient1, ingredient2 ],
    };
    const payload = ingredient1;

    const expected1 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        bun2,
        { ...ingredient1, count: 1 },
        ingredient2
      ],
    };
    const expected2 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        bun2,
        { ...ingredient1, count: 2 },
        ingredient2
      ],
    };

    expect(
      reducer(initial, increaseIngredientCountAction(payload))
    ).toEqual(expected1);
    expect(
      reducer(expected1, increaseIngredientCountAction(payload))
    ).toEqual(expected2);
  })

  it('increaseIngredientCount() should increase bun count by 2', () => {
    const initial = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [ bun1, bun2, ingredient1, ingredient2 ],
    };
    const payload = bun1;

    const expected = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        { ...bun1, count: 2 },
        bun2,
        ingredient1,
        ingredient2
      ],
    };

    expect(reducer(initial, increaseIngredientCountAction(payload)))
      .toEqual(expected);
    expect(reducer(expected, increaseIngredientCountAction(payload)))
      .toEqual(expected);
  })

  it('increaseIngredientCount() should increase bun count by 2 and reset another bun count', () => {
    const initial = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        { ...bun1, count: 2 },
        bun2,
        ingredient1,
        ingredient2
      ],
    };
    const payload = bun2;

    const expected = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        { ...bun2, count: 2 },
        ingredient1,
        ingredient2
      ],
    };

    expect(reducer(initial, increaseIngredientCountAction(payload)))
      .toEqual(expected);
  })

  it('decreaseIngredientCount() should decrease ingredient count by 1', () => {
    const initial = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        bun2,
        { ...ingredient1, count: 2 },
        ingredient2
      ],
    };
    const payload = ingredient1.id;

    const expected1 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        bun2,
        { ...ingredient1, count: 1 },
        ingredient2
      ],
    };
    const expected2 = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        bun2,
        { ...ingredient1, count: 0 },
        ingredient2
      ],
    };

    expect(reducer(initial, decreaseIngredientCountAction(payload)))
      .toEqual(expected1);
    expect(reducer(expected1, decreaseIngredientCountAction(payload)))
      .toEqual(expected2);
  })

  it('resetIngredientsCounter() should set all counter to zero', () => {
    const initial = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [
        bun1,
        { ...bun2, count: 2 },
        { ...ingredient1, count: 5 },
        { ...ingredient2, count: 10 }
      ],
    };

    const expected = {
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [ bun1, bun2, ingredient1, ingredient2 ],
    };

    expect(reducer(initial, resetIngredientsCounterAction()))
      .toEqual(expected);
  })
});


describe('Test ingredients thunk', () => {
  it('Test getIngredients()', ()  => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: [ bun1Raw, ingredient1Raw ],
        }),
      })
    });


    const store = mockStore({
      formResetPassword: initialState,
    });

    const expectedActions = [
      {
        type: 'INGREDIETNS_SUCCESS',
        payload: [ bun1, ingredient1 ]
      }
    ];

    return store.dispatch(getIngredientsAction()).then(() => {
      const actions = store.getActions()

      expect(actions).toEqual(expectedActions);
    });
  })
});
