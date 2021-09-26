import {
  INGREDIETNS_REQUEST,
  INGREDIETNS_SUCCESS,
  INGREDIETNS_FAILURE,
  INGREDIETNS_INCREASE_INGREDIENT_COUNT,
  INGREDIETNS_DECREASE_INGREDIENT_COUNT,
  INGREDIETNS_RESET_INGREDIENTS_COUNTER
} from '../constants/action-types';
import { TIngredient } from '../types/data';
import { getIngredientsRequest } from '../api';
import { adaptIngredients } from '../../utils/adapter';


type TIncreaseCountData = { id: string; type: string; };
type TDecreaseCountData = string;

// Action types
export type TRequestAction = {
  readonly type: typeof INGREDIETNS_REQUEST;
}
export type TSuccessAction = {
  readonly type: typeof INGREDIETNS_SUCCESS;
  readonly payload: Array<TIngredient>;
}
export type TFailureAction = {
  readonly type: typeof INGREDIETNS_FAILURE;
}
export type TIncreaseIngredientCountAction = {
  readonly type: typeof INGREDIETNS_INCREASE_INGREDIENT_COUNT;
  readonly payload: TIncreaseCountData;
}
export type TDecreaseIngredientCountAction = {
  readonly type: typeof INGREDIETNS_DECREASE_INGREDIENT_COUNT;
  readonly payload: TDecreaseCountData;
}
export type TResetIngredientsCounterAction = {
  readonly type: typeof INGREDIETNS_RESET_INGREDIENTS_COUNTER;
}


// All actions
export type TIngredientActions =
  | TRequestAction
  | TSuccessAction
  | TFailureAction
  | TIncreaseIngredientCountAction
  | TDecreaseIngredientCountAction
  | TResetIngredientsCounterAction;


// Action creators
export const requestAction =
  (): TRequestAction => ({
    type: INGREDIETNS_REQUEST,
  });

export const successAction =
  (ingredients: Array<TIngredient>): TSuccessAction => ({
    type: INGREDIETNS_SUCCESS,
    payload: ingredients,
  });

export const failureAction =
  (): TFailureAction => ({
    type: INGREDIETNS_FAILURE,
  });

export const increaseIngredientCountAction =
  (payload: TIncreaseCountData): TIncreaseIngredientCountAction => ({
    type: INGREDIETNS_INCREASE_INGREDIENT_COUNT,
    payload,
  });

export const decreaseIngredientCountAction =
  (payload: TDecreaseCountData): TDecreaseIngredientCountAction => ({
    type: INGREDIETNS_DECREASE_INGREDIENT_COUNT,
    payload,
  });

export const resetIngredientsCounterAction =
  (): TResetIngredientsCounterAction => ({
    type: INGREDIETNS_RESET_INGREDIENTS_COUNTER,
  });


// Async actions
export const getIngredientsAction = () => async (dispatch) => {
  await getIngredientsRequest()
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Responsed with status ${response.status}`);
    })
    .then(dataContainer => {
      if (dataContainer.success) {
        const ingredients = adaptIngredients(dataContainer.data);
        dispatch(successAction(ingredients));
      } else {
        throw new Error(`Get data finished with no success`);
      }
    })
    .catch(err => {
      console.error('Error:', err);
    })
};
