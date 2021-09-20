import { createSlice } from '@reduxjs/toolkit';
import { adaptIngredients } from '../../utils/adapter';
import { getIngredientsRequest } from '../api';

export const initialState = {
  INGREDIENTS_REQUEST: false,
  INGREDIENTS_SUCCESS: false,
  INGREDIENTS_FAILURE: false,
  items: [],
};


export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    request: (state) => ({
      ...state,
      INGREDIENTS_REQUEST: true,
      INGREDIENTS_SUCCESS: false,
      INGREDIENTS_FAILURE: false,
      items: [...state.items],
    }),

    failure: () => ({
      ...initialState,
      INGREDIENTS_FAILURE: true,
    }),

    success: (state, action) => ({
      ...state,
      INGREDIENTS_REQUEST: false,
      INGREDIENTS_SUCCESS: true,
      INGREDIENTS_FAILURE: false,
      items: action.payload,
    }),

    increaseIngredientCount: (state, action) => {
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
      });
    },

    decreaseIngredientCount: (state, action) => {
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
      });
    },

    resetIngredientsCounter: (state) => {
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
      };
    },
  },
});


export const {
  request,
  success,
  failure,
  increaseIngredientCount,
  decreaseIngredientCount,
  resetIngredientsCounter
} = ingredientsSlice.actions;

export const getIngredients = () => async (dispatch) => {
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
        dispatch(success(ingredients));
      } else {
        throw new Error(`Get data finished with no success`);
      }
    })
    .catch(err => {
      console.error('Error:', err);
    })
};


export default ingredientsSlice.reducer;
