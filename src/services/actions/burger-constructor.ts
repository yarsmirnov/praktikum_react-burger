import {
  BURGER_CONSTRUCTOR_ADD_ITEM,
  BURGER_CONSTRUCTOR_REMOVE_ITEM,
  BURGER_CONSTRUCTOR_MOVE_ITEM,
  BURGER_CONSTRUCTOR_SET_BUN,
  BURGER_CONSTRUCTOR_CLEAR_CONSTRUCTOR,
} from '../constants/action-types';
import { TConstructorIngredient } from '../types/data';


type TMoveItemInfo = {
  dragged: number;
  hovered: number;
}

// Action types
export type TAddItemAction = {
  readonly type: typeof BURGER_CONSTRUCTOR_ADD_ITEM;
  readonly payload: TConstructorIngredient;
}
export type TRemoveItemAction = {
  readonly type: typeof BURGER_CONSTRUCTOR_REMOVE_ITEM;
  readonly payload: string;
}
export type TMoveItemAction = {
  readonly type: typeof BURGER_CONSTRUCTOR_MOVE_ITEM;
  readonly payload: TMoveItemInfo;
}
export type TSetBunAction = {
  readonly type: typeof BURGER_CONSTRUCTOR_SET_BUN;
  readonly payload: TConstructorIngredient;
}
export type TClearConstructorAction = {
  readonly type: typeof BURGER_CONSTRUCTOR_CLEAR_CONSTRUCTOR;
}


// All types
export type TBurgerConstructorActions =
  | TAddItemAction
  | TRemoveItemAction
  | TMoveItemAction
  | TSetBunAction
  | TClearConstructorAction;


// Action creators
export const addItemAction =
  (item: TConstructorIngredient): TAddItemAction => ({
    type: BURGER_CONSTRUCTOR_ADD_ITEM,
    payload: item,
  });

export const removeItemAction =
  (ItemUuid: string): TRemoveItemAction => ({
    type: BURGER_CONSTRUCTOR_REMOVE_ITEM,
    payload: ItemUuid,
  });

export const moveItemAction =
  (obj: TMoveItemInfo): TMoveItemAction => ({
    type: BURGER_CONSTRUCTOR_MOVE_ITEM,
    payload: obj,
  });

export const setBunAction =
  (item: TConstructorIngredient): TSetBunAction => ({
    type: BURGER_CONSTRUCTOR_SET_BUN,
    payload: item,
  });

export const clearConstructorAction = () => ({
  type: BURGER_CONSTRUCTOR_CLEAR_CONSTRUCTOR,
});
