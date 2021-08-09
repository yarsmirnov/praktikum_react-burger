import { createSlice } from '@reduxjs/toolkit';
import { adaptIngredients } from '../../utils/adapter';

const initialState = {
  value: [],
};
const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';


export const ingredientsSlide = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => ({
      ...state,
      value: action.payload,
    }),
  },
});


export const { setIngredients } = ingredientsSlide.actions;

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
