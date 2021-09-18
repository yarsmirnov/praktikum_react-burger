import reducer from './ingredients';
import {
  request,
  success,
  failure,
  increaseIngredientCount,
  decreaseIngredientCount,
  resetIngredientsCounter
} from './ingredients';

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

    expect(reducer(initial1, request()))
      .toEqual(expected);
    expect(reducer(initial2, request()))
      .toEqual(expected);
    expect(reducer(initial3, request()))
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

    expect(reducer(initial1, success(payload)))
      .toEqual(expected);
    expect(reducer(initial2, success(payload)))
      .toEqual(expected);
    expect(reducer(initial3, success(payload)))
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

    expect(reducer(initial1, failure()))
      .toEqual(expected);
    expect(reducer(initial2, failure()))
      .toEqual(expected);
    expect(reducer(initial3, failure()))
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
      reducer(initial, increaseIngredientCount(payload))
    ).toEqual(expected1);
    expect(
      reducer(expected1, increaseIngredientCount(payload))
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

    expect(reducer(initial, increaseIngredientCount(payload)))
      .toEqual(expected);
    expect(reducer(expected, increaseIngredientCount(payload)))
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

    expect(reducer(initial, increaseIngredientCount(payload)))
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

    expect(reducer(initial, decreaseIngredientCount(payload)))
      .toEqual(expected1);
    expect(reducer(expected1, decreaseIngredientCount(payload)))
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

    expect(reducer(initial, resetIngredientsCounter()))
      .toEqual(expected);
  })
});
