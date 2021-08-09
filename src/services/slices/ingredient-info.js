import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: {},
};


export const ingredientInfoSlice = createSlice({
  name: 'ingredientInfo',
  initialState,
  reducers: {
    setData: (state, action) => ({
      ...state,
      data: {...action.payload},
    })
  },
});

export const { setData } = ingredientInfoSlice.actions;


export default ingredientInfoSlice.reducer;
