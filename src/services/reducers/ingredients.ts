import {
  INGREDIETNS_REQUEST,
  INGREDIETNS_SUCCESS,
  INGREDIETNS_FAILURE,
  INGREDIETNS_INCREASE_INGREDIENT_COUNT,
  INGREDIETNS_DECREASE_INGREDIENT_COUNT,
  INGREDIETNS_RESET_INGREDIENTS_COUNTER
} from '../constants/action-types';
import {
  TIngredientActions
} from '../actions/ingredients';
import { TIngredient } from '../types/data';


type TState = {
  INGREDIENTS_REQUEST: boolean;
  INGREDIENTS_SUCCESS: boolean;
  INGREDIENTS_FAILURE: boolean;
  items: Array<TIngredient>,
}

export const initialState: TState = {
  INGREDIENTS_REQUEST: false,
  INGREDIENTS_SUCCESS: false,
  INGREDIENTS_FAILURE: false,
  items: [],
};


const ingredientsReducer = (state = initialState, action: TIngredientActions): TState => {
  switch (action.type) {

    case (INGREDIETNS_REQUEST): {
      return {
        ...state,
        INGREDIENTS_REQUEST: true,
        INGREDIENTS_SUCCESS: false,
        INGREDIENTS_FAILURE: false,
        items: [...state.items],
      }
    }

    case (INGREDIETNS_SUCCESS): {
      return {
        ...state,
        INGREDIENTS_REQUEST: false,
        INGREDIENTS_SUCCESS: true,
        INGREDIENTS_FAILURE: false,
        items: action.payload,
      }
    }

    case (INGREDIETNS_FAILURE): {
      return {
        ...initialState,
        INGREDIENTS_REQUEST: false,
        INGREDIENTS_SUCCESS: false,
        INGREDIENTS_FAILURE: true,
      }
    }

    case (INGREDIETNS_INCREASE_INGREDIENT_COUNT): {
      const {id, type} = action.payload;
      const updatedIngredients = [...state.items].map(
        item => {
          if (type === 'bun' && item.type === 'bun') {
            return ({
              ...item,
              count: item.id === id ? 2 : 0,
            });
          }

          if (item.id === id) {
            return {
              ...item,
              count: item.count + 1,
            }
          }
          return item;
        }
      );
      return ({
        ...state,
        items: updatedIngredients,
      })
    }

    case (INGREDIETNS_DECREASE_INGREDIENT_COUNT): {
      const id = action.payload;
      const updatedIngredients = [...state.items].map(
        item => {
          if (item.id === id) {
            return {
              ...item,
              count: item.count - 1,
            }
          }
          return item;
        }
      );
      return ({
        ...state,
        items: updatedIngredients,
      })
    }

    case (INGREDIETNS_RESET_INGREDIENTS_COUNTER): {
      const itemsWithEmptyCounter = state.items.map(
        item => {
          if (item.count) {
            return { ...item, count: 0 };
          }
          return item;
        }
      );

      return {
        ...state,
        items: itemsWithEmptyCounter,
      }
    }

    default: {
      return state
    }
  }
};


export default ingredientsReducer;
