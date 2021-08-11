import { createSlice } from '@reduxjs/toolkit';
import { adaptIngredients } from '../../utils/adapter';

const initialState = {
  items: [],
};
const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';


export const ingredientsSlide = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => ({
      ...state,
      items: action.payload,
    }),

    increaseIngredientCount: (state, action) => {
      const {id, type} = action.payload;
      const updatedIngredients = [...state.items].map(
        item => {
          if (type === 'bun' && item.type === 'bun') {
            return ({
              ...item,
              count: item.id === id ? 1 : 0,
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
  },
});


export const {
  setIngredients,
  increaseIngredientCount,
  decreaseIngredientCount
} = ingredientsSlide.actions;

export const getIngredients = () => async (dispatch) => {
  fetch(ingredientsApi)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Responsed with status ${response.status}`);
    })
    .then(dataContainer => {
      if (dataContainer.success) {
        const ingredients = adaptIngredients(dataContainer.data);
        dispatch(setIngredients(ingredients));
      } else {
        throw new Error(`Get data finished with no success`);
      }
    })
    .catch(err => {
      console.log('Error:', err);
    })
}


export default ingredientsSlide.reducer;
