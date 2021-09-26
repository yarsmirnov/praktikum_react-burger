import reducer from './burger-constructor';
// import {
//   addItemAction,
//   removeItemAction,
//   moveItem,
//   setBunAction,
//   clearConstructorAction
// } from './burger-constructor';
import {
  addItemAction,
  removeItemAction,
  moveItemAction,
  setBunAction,
  clearConstructorAction
} from '../actions/burger-constructor';



const bun1 = {
  id: '60d3b41abdacab0026a733c6',
  type: 'bun',
  name: 'Краторная булка N-200i',
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  uuid: '3be6ad7b-f130-4824-b92f-f9069a7f1d43'
};

const bun2 = {
  id: '60d3b41abdacab0026a733c7',
  type: 'bun',
  name: 'Флюоресцентная булка R2-D3',
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  uuid: 'a1cb4fdd-5728-4048-8c50-e229e37bb9ec'
};

const item1 = {
  id: '60d3b41abdacab0026a733cf',
  type: 'sauce',
  name: 'Соус с шипами Антарианского плоскоходца',
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  uuid: 'f9769531-b8e2-4fc5-92fa-1cd9b9815745'
};

const item2 = {
  id: '60d3b41abdacab0026a733c9',
  type: 'main',
  name: 'Мясо бессмертных моллюсков Protostomia',
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  uuid: '10dd5551-0c6c-43f1-85af-b3a17f733737'
};

const item3 = {
  id: '60d3b41abdacab0026a733cd',
  type: 'sauce',
  name: 'Соус фирменный Space Sauce',
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  uuid: 'dbbd4bb4-bc99-4af3-9cad-98294614388e'
}


describe('Test burger-constructor reducer', () => {
  it('addItemAction() should add an item to items', () => {
    const initial = { items: [] };

    const expected1 = { items: [ item1 ] };
    const expected2 = { items: [ item1, item2 ] };

    expect(reducer(initial, addItemAction(item1)))
      .toEqual(expected1);
    expect(reducer(expected1, addItemAction(item2)))
      .toEqual(expected2);
  })


  it('setBunAction() should add item to items', () => {
    const initial = { items: [] };

    const expected = { items: [ bun1 ] };

    expect(reducer(initial, setBunAction(bun1)))
      .toEqual(expected);
  })


  it('setBunAction() should replace bun item in items', () => {
    const initial = {
      items: [ bun1, item1 ]
    };

    const expected = {
      items: [ bun2, item1 ]
    };

    expect(reducer(initial, setBunAction(bun2)))
      .toEqual(expected);
  })

  it('removeItemAction() should remove correct item', () => {
    const initial = { items: [ bun1, item1, item2, item3 ] };
    const uuidToRemove = item2.uuid;

    const expected = { items: [ bun1, item1, item3] };

    expect(reducer(initial, removeItemAction(uuidToRemove)))
      .toEqual(expected);
  })

  it('moveItemAction() should correctly change order of items', () => {
    const initial = { items: [ bun1, item1, item2, item3 ] };
    const payload1 = { dragged: 1, hovered: 1 };
    const payload2 = { dragged: 1, hovered: 2 };
    const payload3 = { dragged: 3, hovered: 2 };

    const expected1 = { items: [ bun1, item1, item2, item3 ] };
    const expected2 = { items: [ bun1, item2, item1, item3 ] };
    const expected3 = { items: [ bun1, item1, item3, item2 ] };

    expect(reducer(initial, moveItemAction(payload1)))
      .toEqual(expected1);
    expect(reducer(initial, moveItemAction(payload2)))
      .toEqual(expected2);
    expect(reducer(initial, moveItemAction(payload3)))
      .toEqual(expected3);
  })

  it('clearConstructorAction() should reset store to initial', () => {
    const initial = { items: [ bun1, item1, item2, item3 ] };

    const expected = { items: [] };

    expect(reducer(initial, clearConstructorAction()))
      .toEqual(expected);
  })
});

